import type { ShopifyCart, CartLine } from "./shopify";
import { MOCK_VARIANT_PREFIX } from "./data";
import { PRODUCTS } from "./products";

const CHECKOUT_DISABLED_URL =
  "/checkout-disabled?reason=connect_shopify_to_enable_checkout";

function makeLine(variantId: string, quantity: number, lineId: string): CartLine {
  const handle = variantId.replace(MOCK_VARIANT_PREFIX, "");
  const product = PRODUCTS.find((p) => p.handle === handle);
  const price = product?.price ?? 0;
  return {
    id: lineId,
    quantity,
    cost: {
      totalAmount: { amount: (price * quantity).toFixed(2), currencyCode: "USD" },
      amountPerQuantity: { amount: price.toFixed(2), currencyCode: "USD" }
    },
    merchandise: {
      id: variantId,
      title: product?.size ?? "Default",
      image: product
        ? { url: product.bottle, altText: product.name, width: 900, height: 1200 }
        : null,
      selectedOptions: [],
      product: {
        handle: product?.handle ?? handle,
        title: product?.name ?? "Unknown",
        featuredImage: product
          ? { url: product.bottle, altText: product.name, width: 900, height: 1200 }
          : null
      }
    }
  };
}

function recompute(lines: CartLine[]): ShopifyCart["cost"] {
  const subtotal = lines.reduce(
    (s, l) => s + Number(l.cost.totalAmount.amount),
    0
  );
  const amt = subtotal.toFixed(2);
  return {
    subtotalAmount: { amount: amt, currencyCode: "USD" },
    totalAmount: { amount: amt, currencyCode: "USD" },
    totalTaxAmount: null
  };
}

export function emptyMockCart(): ShopifyCart {
  return {
    id: "mock-cart",
    checkoutUrl: CHECKOUT_DISABLED_URL,
    totalQuantity: 0,
    cost: recompute([]),
    lines: []
  };
}

export function mockAdd(
  cart: ShopifyCart,
  variantId: string,
  quantity: number
): ShopifyCart {
  const existing = cart.lines.find((l) => l.merchandise.id === variantId);
  let lines = cart.lines.slice();
  if (existing) {
    lines = lines.map((l) =>
      l.merchandise.id === variantId
        ? makeLine(variantId, l.quantity + quantity, l.id)
        : l
    );
  } else {
    lines.push(makeLine(variantId, quantity, `mock-line-${Date.now()}-${Math.random()}`));
  }
  return {
    ...cart,
    lines,
    totalQuantity: lines.reduce((s, l) => s + l.quantity, 0),
    cost: recompute(lines)
  };
}

export function mockUpdate(
  cart: ShopifyCart,
  lineId: string,
  quantity: number
): ShopifyCart {
  let lines = cart.lines.slice();
  if (quantity <= 0) {
    lines = lines.filter((l) => l.id !== lineId);
  } else {
    lines = lines.map((l) =>
      l.id === lineId ? makeLine(l.merchandise.id, quantity, l.id) : l
    );
  }
  return {
    ...cart,
    lines,
    totalQuantity: lines.reduce((s, l) => s + l.quantity, 0),
    cost: recompute(lines)
  };
}

export function mockRemove(cart: ShopifyCart, lineId: string): ShopifyCart {
  const lines = cart.lines.filter((l) => l.id !== lineId);
  return {
    ...cart,
    lines,
    totalQuantity: lines.reduce((s, l) => s + l.quantity, 0),
    cost: recompute(lines)
  };
}
