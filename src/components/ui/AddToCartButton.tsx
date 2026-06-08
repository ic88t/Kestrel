"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

type Props = {
  variantId: string | null;
  price: number;
  currency?: string;
  available?: boolean;
  variant?: "primary" | "ghost" | "card" | "hero";
  className?: string;
  label?: string;
  quantity?: number;
  subscription?: boolean;
  subscriptionDiscount?: number; // 0–1, default 0.25
};

function money(n: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(n);
  } catch {
    return `$${n.toFixed(0)}`;
  }
}

export default function AddToCartButton({
  variantId,
  price,
  currency = "USD",
  available = true,
  variant = "primary",
  className,
  label,
  quantity = 1,
  subscription = false,
  subscriptionDiscount = 0.25
}: Props) {
  const { add, pending } = useCart();
  const ref = useRef<HTMLButtonElement>(null);
  const [added, setAdded] = useState(false);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || variant === "card") return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.1}px, ${(e.clientY - r.top - r.height / 2) * 0.1}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const handle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variantId || !available) return;
    await add(variantId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const disabled = !variantId || !available || pending;

  const styles =
    variant === "primary"
      ? "bg-paper text-ink hover:bg-brass px-8 py-4"
      : variant === "ghost"
        ? "border border-paper/30 text-paper hover:bg-paper hover:text-ink px-8 py-4"
        : variant === "hero"
          ? "bg-paper text-ink hover:bg-brass w-full py-5 text-[13px] font-medium tracking-[0.25em]"
          : "bg-paper text-ink py-3 px-4 w-full";

  const unitPrice = subscription ? price * (1 - subscriptionDiscount) : price;
  const totalPrice = unitPrice * quantity;
  const text = !available
    ? "Sold Out"
    : added
      ? "Added ✓"
      : label ??
        (subscription
          ? `Subscribe — ${money(totalPrice, currency)}`
          : `Add to Bag — ${money(totalPrice, currency)}`);

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handle}
      disabled={disabled}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={cn(
        "inline-flex items-center justify-center gap-3 text-[11px] tracking-widest uppercase select-none cursor-pointer transition-colors duration-300 ease-smooth will-change-transform disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-1 focus-visible:ring-brass",
        styles,
        className
      )}
    >
      {pending && !added ? "Adding…" : text}
    </motion.button>
  );
}
