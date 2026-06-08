import {
  PRODUCTS as MOCK_PRODUCTS,
  RITUALS,
  type Product as MockProduct,
  type Ritual,
  type ProductVariant,
  type Review
} from "./products";
import {
  SHOPIFY_CONFIGURED,
  getProducts as sfGetProducts,
  getProduct as sfGetProduct,
  getCollectionProducts as sfGetCollection,
  getAllProductHandles as sfGetHandles,
  type ShopifyProduct
} from "./shopify";

export { RITUALS };
export type { Ritual, ProductVariant, Review };

/**
 * Unified product view used across the UI.
 * Maps cleanly from BOTH the mock catalog and Shopify Storefront API.
 */
export type ViewProduct = {
  id: string;
  handle: string;
  name: string;
  number: string;
  tagline: string;
  description: string;
  ritual: Ritual;
  size: string;
  price: number;
  currency: string;
  hero: string;
  bottle: string;
  ingredients: { name: string; role: string }[];
  howTo: string[];
  claims: string[];
  variantId: string | null;
  availableForSale: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  reviews: Review[];
};

const MOCK_VARIANT_PREFIX = "mock-variant-";

function fromMock(p: MockProduct): ViewProduct {
  const defaultVariant = p.variants[0];
  return {
    id: `mock-${p.handle}`,
    handle: p.handle,
    name: p.name,
    number: p.number,
    tagline: p.tagline,
    description: p.description,
    ritual: p.ritual,
    size: p.size,
    price: defaultVariant?.price ?? p.price,
    currency: "USD",
    hero: p.hero,
    bottle: p.bottle,
    ingredients: p.ingredients,
    howTo: p.howTo,
    claims: p.claims,
    variantId: `${MOCK_VARIANT_PREFIX}${p.handle}`,
    availableForSale: p.variants.some((v) => v.available),
    rating: p.rating,
    reviewCount: p.reviewCount,
    variants: p.variants,
    reviews: p.reviews
  };
}

function parseTag(tags: string[], prefix: string): string | undefined {
  const hit = tags.find((t) => t.toLowerCase().startsWith(`${prefix}:`));
  return hit?.split(":").slice(1).join(":").trim();
}

function inferRitual(p: ShopifyProduct): Ritual {
  const fromTag = parseTag(p.tags, "ritual") as Ritual | undefined;
  if (fromTag && ["scalp"].includes(fromTag)) return fromTag;
  const fromType = p.productType.toLowerCase();
  if (["scalp"].includes(fromType)) return fromType as Ritual;
  return "scalp";
}

function fromShopify(p: ShopifyProduct): ViewProduct {
  const v = p.variants[0];
  const heroImg = p.images[0]?.url ?? p.featuredImage?.url ?? "";
  const bottleImg = p.featuredImage?.url ?? p.images[0]?.url ?? heroImg;
  return {
    id: p.id,
    handle: p.handle,
    name: p.title,
    number: parseTag(p.tags, "number") ?? "",
    tagline: parseTag(p.tags, "tagline") ?? p.description.split(/\n/)[0]?.slice(0, 140) ?? "",
    description: p.description,
    ritual: inferRitual(p),
    size: parseTag(p.tags, "size") ?? v?.title ?? "",
    price: Number(v?.price.amount ?? p.priceRange.minVariantPrice.amount ?? 0),
    currency: v?.price.currencyCode ?? p.priceRange.minVariantPrice.currencyCode ?? "USD",
    hero: heroImg,
    bottle: bottleImg,
    ingredients: parseIngredients(p),
    howTo: parseHowTo(p),
    claims: parseClaims(p),
    variantId: v?.id ?? null,
    availableForSale: p.availableForSale,
    rating: 0,
    reviewCount: 0,
    variants: [],
    reviews: []
  };
}

function parseIngredients(p: ShopifyProduct): { name: string; role: string }[] {
  const raw = parseTag(p.tags, "ingredients");
  if (!raw) return [];
  return raw.split("|").map((pair) => {
    const [name, role] = pair.split("=");
    return { name: name?.trim() ?? "", role: role?.trim() ?? "" };
  });
}
function parseHowTo(p: ShopifyProduct): string[] {
  const raw = parseTag(p.tags, "howto");
  if (!raw) return [];
  return raw.split("|").map((s) => s.trim()).filter(Boolean);
}
function parseClaims(p: ShopifyProduct): string[] {
  const raw = parseTag(p.tags, "claims");
  if (!raw) return [];
  return raw.split("|").map((s) => s.trim()).filter(Boolean);
}

export async function getAllProducts(): Promise<ViewProduct[]> {
  if (!SHOPIFY_CONFIGURED) return MOCK_PRODUCTS.map(fromMock);
  const sf = await sfGetProducts();
  return sf.map(fromShopify);
}

export async function getProductByHandle(handle: string): Promise<ViewProduct | null> {
  if (!SHOPIFY_CONFIGURED) {
    const p = MOCK_PRODUCTS.find((x) => x.handle === handle);
    return p ? fromMock(p) : null;
  }
  const p = await sfGetProduct(handle);
  return p ? fromShopify(p) : null;
}

export async function getProductsByRitual(ritual: Ritual): Promise<ViewProduct[]> {
  if (!SHOPIFY_CONFIGURED) {
    return MOCK_PRODUCTS.filter((p) => p.ritual === ritual).map(fromMock);
  }
  const sf = await sfGetCollection(ritual);
  if (sf.length) return sf.map(fromShopify);
  const all = await getAllProducts();
  return all.filter((p) => p.ritual === ritual);
}

export async function getAllHandles(): Promise<string[]> {
  if (!SHOPIFY_CONFIGURED) return MOCK_PRODUCTS.map((p) => p.handle);
  return sfGetHandles();
}

export { SHOPIFY_CONFIGURED, MOCK_VARIANT_PREFIX };
