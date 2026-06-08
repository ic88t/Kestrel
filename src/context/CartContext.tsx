"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useTransition,
  useEffect,
  useMemo,
  ReactNode
} from "react";
import type { ShopifyCart } from "@/lib/shopify";
import {
  addToCart as addAction,
  updateLine as updateAction,
  removeLine as removeAction,
  fetchCart
} from "@/app/actions/cart";

type CartContextValue = {
  cart: ShopifyCart | null;
  open: boolean;
  pending: boolean;
  configured: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (variantId: string, quantity?: number) => Promise<void>;
  update: (lineId: string, quantity: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  initialCart,
  configured,
  children
}: {
  initialCart: ShopifyCart | null;
  configured: boolean;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<ShopifyCart | null>(initialCart);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (initialCart) return;
    fetchCart().then(setCart).catch(() => {});
  }, [initialCart]);

  const add = useCallback(
    async (variantId: string, quantity = 1) => {
      startTransition(async () => {
        try {
          const next = await addAction(variantId, quantity);
          setCart(next);
          setOpen(true);
        } catch (e) {
          console.error("addToCart failed", e);
        }
      });
    },
    []
  );

  const update = useCallback(async (lineId: string, quantity: number) => {
    setCart((prev) => {
      if (!prev) return prev;
      const lines =
        quantity <= 0
          ? prev.lines.filter((l) => l.id !== lineId)
          : prev.lines.map((l) =>
              l.id === lineId
                ? {
                    ...l,
                    quantity,
                    cost: {
                      ...l.cost,
                      totalAmount: {
                        ...l.cost.totalAmount,
                        amount: (
                          Number(l.cost.amountPerQuantity.amount) * quantity
                        ).toFixed(2)
                      }
                    }
                  }
                : l
            );
      const total = lines.reduce((s, l) => s + l.quantity, 0);
      const subtotal = lines
        .reduce((s, l) => s + Number(l.cost.totalAmount.amount), 0)
        .toFixed(2);
      return {
        ...prev,
        lines,
        totalQuantity: total,
        cost: {
          ...prev.cost,
          subtotalAmount: { ...prev.cost.subtotalAmount, amount: subtotal },
          totalAmount: { ...prev.cost.totalAmount, amount: subtotal }
        }
      };
    });
    startTransition(async () => {
      try {
        const next = await updateAction(lineId, quantity);
        setCart(next);
      } catch (e) {
        console.error("updateLine failed", e);
        const fresh = await fetchCart().catch(() => null);
        if (fresh) setCart(fresh);
      }
    });
  }, []);

  const remove = useCallback(async (lineId: string) => {
    setCart((prev) => {
      if (!prev) return prev;
      const lines = prev.lines.filter((l) => l.id !== lineId);
      const subtotal = lines
        .reduce((s, l) => s + Number(l.cost.totalAmount.amount), 0)
        .toFixed(2);
      return {
        ...prev,
        lines,
        totalQuantity: lines.reduce((s, l) => s + l.quantity, 0),
        cost: {
          ...prev.cost,
          subtotalAmount: { ...prev.cost.subtotalAmount, amount: subtotal },
          totalAmount: { ...prev.cost.totalAmount, amount: subtotal }
        }
      };
    });
    startTransition(async () => {
      try {
        const next = await removeAction(lineId);
        setCart(next);
      } catch (e) {
        console.error("removeLine failed", e);
        const fresh = await fetchCart().catch(() => null);
        if (fresh) setCart(fresh);
      }
    });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      open,
      pending,
      configured,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add,
      update,
      remove
    }),
    [cart, open, pending, configured, add, update, remove]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
