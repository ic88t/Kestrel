import { shopifyFetch, SHOPIFY_CONFIGURED } from "./client";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTION_PRODUCTS,
  GET_PRODUCT_HANDLES,
  CREATE_CART,
  GET_CART,
  ADD_CART_LINES,
  UPDATE_CART_LINES,
  REMOVE_CART_LINES
} from "./queries";
import type { ShopifyProduct, ShopifyCart } from "./types";

export { SHOPIFY_CONFIGURED };
export * from "./types";

type ProductsResp = { products: { nodes: ShopifyProduct[] } };
type ProductResp = { product: ShopifyProduct | null };
type CollectionResp = {
  collection: { products: { nodes: ShopifyProduct[] } } | null;
};
type HandlesResp = { products: { nodes: { handle: string; updatedAt: string }[] } };

const TAGS = {
  products: "shopify:products",
  product: (handle: string) => `shopify:product:${handle}`,
  collection: (handle: string) => `shopify:collection:${handle}`,
  cart: "shopify:cart"
};

export async function getProducts(first = 100): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResp>(GET_PRODUCTS, {
    variables: { first, sortKey: "TITLE", reverse: false },
    tags: [TAGS.products],
    revalidate: 60
  });
  return data.products.nodes;
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductResp>(GET_PRODUCT_BY_HANDLE, {
    variables: { handle },
    tags: [TAGS.product(handle)],
    revalidate: 60
  });
  return data.product;
}

export async function getCollectionProducts(handle: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<CollectionResp>(GET_COLLECTION_PRODUCTS, {
    variables: { handle, first: 100 },
    tags: [TAGS.collection(handle)],
    revalidate: 60
  });
  return data.collection?.products.nodes ?? [];
}

export async function getAllProductHandles(): Promise<string[]> {
  const data = await shopifyFetch<HandlesResp>(GET_PRODUCT_HANDLES, {
    variables: { first: 250 },
    revalidate: 300
  });
  return data.products.nodes.map((n) => n.handle);
}

type CartMutationResp = {
  cartCreate?: { cart: ShopifyCart; userErrors: { message: string }[] };
  cartLinesAdd?: { cart: ShopifyCart; userErrors: { message: string }[] };
  cartLinesUpdate?: { cart: ShopifyCart; userErrors: { message: string }[] };
  cartLinesRemove?: { cart: ShopifyCart; userErrors: { message: string }[] };
};

function unwrap(
  resp: CartMutationResp,
  key: keyof CartMutationResp
): ShopifyCart {
  const block = resp[key];
  if (!block) throw new Error(`Missing ${key} in response`);
  if (block.userErrors.length) {
    throw new Error(`Cart error: ${block.userErrors.map((e) => e.message).join("; ")}`);
  }
  return block.cart;
}

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<CartMutationResp>(CREATE_CART, {
    variables: { input: {} },
    cache: "no-store"
  });
  return unwrap(data, "cartCreate");
}

export async function getCart(id: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(GET_CART, {
    variables: { id },
    cache: "no-store"
  });
  return data.cart;
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<CartMutationResp>(ADD_CART_LINES, {
    variables: { cartId, lines },
    cache: "no-store"
  });
  return unwrap(data, "cartLinesAdd");
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<CartMutationResp>(UPDATE_CART_LINES, {
    variables: { cartId, lines },
    cache: "no-store"
  });
  return unwrap(data, "cartLinesUpdate");
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<CartMutationResp>(REMOVE_CART_LINES, {
    variables: { cartId, lineIds },
    cache: "no-store"
  });
  return unwrap(data, "cartLinesRemove");
}
