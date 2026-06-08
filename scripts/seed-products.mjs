#!/usr/bin/env node
/**
 * One-shot seeder. Creates the 8 KESTREL products in your Shopify dev store
 * via the Admin GraphQL API. Re-runs are safe: existing handles are skipped.
 *
 * Usage:
 *   1. Add to .env.local:
 *        SHOPIFY_STORE_DOMAIN=xxx.myshopify.com
 *        SHOPIFY_ADMIN_TOKEN=shpat_...
 *   2. Run: node scripts/seed-products.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env.local");

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return;
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, k, v] = m;
    if (!process.env[k]) process.env[k] = v.replace(/^['"]|['"]$/g, "");
  }
}
loadEnv();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API = "2024-10";

if (!DOMAIN || !TOKEN) {
  console.error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_TOKEN in .env.local");
  process.exit(1);
}

const PRODUCTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts", "seed-data.json"), "utf8")
);

async function gql(query, variables) {
  const res = await fetch(`https://${DOMAIN}/admin/api/${API}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const FIND_BY_HANDLE = /* GraphQL */ `
  query FindByHandle($handle: String!) {
    productByHandle(handle: $handle) { id handle }
  }
`;

const CREATE_PRODUCT = /* GraphQL */ `
  mutation CreateProduct($product: ProductInput!) {
    productCreate(product: $product) {
      product { id handle }
      userErrors { field message }
    }
  }
`;

const CREATE_VARIANTS = /* GraphQL */ `
  mutation BulkVariants($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkCreate(productId: $productId, variants: $variants) {
      productVariants { id title }
      userErrors { field message }
    }
  }
`;

async function ensureProduct(p) {
  const found = await gql(FIND_BY_HANDLE, { handle: p.handle });
  if (found.productByHandle) {
    console.log(`  skip   ${p.handle} (exists)`);
    return found.productByHandle.id;
  }

  const tags = [
    `ritual:${p.ritual}`,
    `number:${p.number}`,
    `size:${p.size}`,
    `tagline:${p.tagline}`,
    `ingredients:${p.ingredients.map((i) => `${i.name}=${i.role}`).join("|")}`,
    `howto:${p.howTo.join("|")}`,
    `claims:${p.claims.join("|")}`
  ];

  const created = await gql(CREATE_PRODUCT, {
    product: {
      title: p.name,
      handle: p.handle,
      descriptionHtml: `<p>${p.description}</p>`,
      productType: p.ritual,
      vendor: "Kestrel",
      tags
    }
  });
  const errs = created.productCreate.userErrors;
  if (errs.length) throw new Error(JSON.stringify(errs));
  const id = created.productCreate.product.id;

  const variantOut = await gql(CREATE_VARIANTS, {
    productId: id,
    variants: [
      {
        price: p.price.toFixed(2),
        inventoryItem: { tracked: false }
      }
    ]
  });
  const vErrs = variantOut.productVariantsBulkCreate.userErrors;
  if (vErrs.length) console.warn(`  variant warn ${p.handle}:`, vErrs);

  console.log(`  create ${p.handle} (${p.name})`);
  return id;
}

(async () => {
  console.log(`Seeding ${PRODUCTS.length} products into ${DOMAIN} …`);
  for (const p of PRODUCTS) {
    try {
      await ensureProduct(p);
    } catch (e) {
      console.error(`  FAIL   ${p.handle}:`, e.message);
    }
  }
  console.log("Done. Next: in Shopify Admin add images to each product, then publish.");
})();
