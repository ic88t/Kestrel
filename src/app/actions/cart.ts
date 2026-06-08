"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import {
  SHOPIFY_CONFIGURED,
  createCart,
  getCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  type ShopifyCart
} from "@/lib/shopify";
import {
  emptyMockCart,
  mockAdd,
  mockUpdate,
  mockRemove
} from "@/lib/cart-mock";

const CART_COOKIE = "kestrel_cart_id";
const MOCK_CART_COOKIE = "kestrel_mock_cart";
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30,
  path: "/"
};

async function readMockCart(): Promise<ShopifyCart> {
  const store = await cookies();
  const raw = store.get(MOCK_CART_COOKIE)?.value;
  if (!raw) return emptyMockCart();
  try {
    return JSON.parse(raw) as ShopifyCart;
  } catch {
    return emptyMockCart();
  }
}

async function writeMockCart(cart: ShopifyCart) {
  const store = await cookies();
  store.set(MOCK_CART_COOKIE, JSON.stringify(cart), COOKIE_OPTS);
}

export async function fetchCart(): Promise<ShopifyCart> {
  if (!SHOPIFY_CONFIGURED) return readMockCart();

  const store = await cookies();
  const id = store.get(CART_COOKIE)?.value;
  if (!id) return emptyMockCart();
  try {
    const cart = await getCart(id);
    if (!cart) return emptyMockCart();
    return cart;
  } catch {
    return emptyMockCart();
  }
}

async function ensureCartId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;
  if (existing) {
    const cart = await getCart(existing).catch(() => null);
    if (cart) return cart.id;
  }
  const fresh = await createCart();
  store.set(CART_COOKIE, fresh.id, COOKIE_OPTS);
  return fresh.id;
}

export async function addToCart(
  variantId: string,
  quantity = 1
): Promise<ShopifyCart> {
  if (!SHOPIFY_CONFIGURED) {
    const current = await readMockCart();
    const next = mockAdd(current, variantId, quantity);
    await writeMockCart(next);
    return next;
  }
  const cartId = await ensureCartId();
  const cart = await addCartLines(cartId, [{ merchandiseId: variantId, quantity }]);
  revalidateTag("shopify:cart");
  return cart;
}

export async function updateLine(lineId: string, quantity: number): Promise<ShopifyCart> {
  if (!SHOPIFY_CONFIGURED) {
    const current = await readMockCart();
    const next = mockUpdate(current, lineId, quantity);
    await writeMockCart(next);
    return next;
  }
  const cartId = await ensureCartId();
  if (quantity <= 0) {
    const cart = await removeCartLines(cartId, [lineId]);
    revalidateTag("shopify:cart");
    return cart;
  }
  const cart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
  revalidateTag("shopify:cart");
  return cart;
}

export async function removeLine(lineId: string): Promise<ShopifyCart> {
  if (!SHOPIFY_CONFIGURED) {
    const current = await readMockCart();
    const next = mockRemove(current, lineId);
    await writeMockCart(next);
    return next;
  }
  const cartId = await ensureCartId();
  const cart = await removeCartLines(cartId, [lineId]);
  revalidateTag("shopify:cart");
  return cart;
}
