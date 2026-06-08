"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 150;

function money(amount: string, currency: string, opts: { withDecimals?: boolean } = {}) {
  const n = Number(amount);
  if (!isFinite(n)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: opts.withDecimals ? 2 : 0
    }).format(n);
  } catch {
    return `$${n.toFixed(opts.withDecimals ? 2 : 0)}`;
  }
}

export default function CartDrawer() {
  const { cart, open, closeCart, update, remove, pending, configured } = useCart();
  const lines = cart?.lines ?? [];
  const subtotal = cart?.cost.subtotalAmount;
  const total = cart?.totalQuantity ?? 0;
  const checkoutUrl = cart?.checkoutUrl;
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCart]);

  const subtotalNumber = subtotal ? Number(subtotal.amount) : 0;
  const currency = subtotal?.currencyCode ?? "USD";
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalNumber);
  const freeShipUnlocked = subtotalNumber >= FREE_SHIPPING_THRESHOLD;
  const progress = Math.min(100, (subtotalNumber / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close cart"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-md"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] z-[70] bg-smoke border-l border-paper/10 flex flex-col"
          >
            <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-paper/10">
              <div>
                <p className="eyebrow text-stone">Your bag</p>
                <p className="text-paper/60 text-sm mt-1">
                  {total} {total === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                ref={closeBtn}
                onClick={closeCart}
                className="text-[11px] tracking-widest uppercase hover:text-brass focus-visible:text-brass focus:outline-none focus-visible:ring-1 focus-visible:ring-brass px-2 py-1 transition-colors"
              >
                Close ×
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
                <p className="display text-4xl text-balance">Nothing yet.</p>
                <p className="text-paper/60 text-sm leading-relaxed max-w-xs">
                  Begin with the ritual finder, or browse the full collection.
                </p>
                <div className="mt-4 flex flex-col gap-3 w-full max-w-[260px]">
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="block text-center bg-paper text-ink text-[11px] tracking-widest uppercase py-3 hover:bg-brass focus:outline-none focus-visible:ring-1 focus-visible:ring-brass transition-colors"
                  >
                    Continue Shopping →
                  </Link>
                  <Link
                    href="/ritual"
                    onClick={closeCart}
                    className="block text-center text-[11px] tracking-widest uppercase border border-paper/30 px-6 py-3 hover:bg-paper hover:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-brass transition-colors"
                  >
                    Take the Ritual Finder
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {!freeShipUnlocked ? (
                  <div className="px-6 pt-4 pb-3 border-b border-paper/10">
                    <p className="text-[11px] tracking-wider text-stone mb-2">
                      Add <span className="text-brass">{money(remaining.toFixed(2), currency, { withDecimals: true })}</span>{" "}
                      for free shipping.
                    </p>
                    <div className="h-px w-full bg-paper/10 overflow-hidden">
                      <div
                        className="h-full bg-brass transition-all duration-500 ease-smooth"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="px-6 pt-4 pb-3 border-b border-paper/10">
                    <p className="text-[11px] tracking-wider text-brass">
                      ✦ Free shipping unlocked.
                    </p>
                  </div>
                )}

                <ul className="flex-1 overflow-y-auto divide-y divide-paper/10">
                  {lines.map((line) => {
                    const img =
                      line.merchandise.image?.url ??
                      line.merchandise.product.featuredImage?.url ??
                      null;
                    const title = line.merchandise.product.title;
                    const variant = line.merchandise.title;
                    const lineTotal = money(
                      line.cost.totalAmount.amount,
                      line.cost.totalAmount.currencyCode
                    );
                    return (
                      <li key={line.id} className="flex gap-4 px-6 py-6 group">
                        <div className="relative w-20 h-24 shrink-0 bg-ink overflow-hidden">
                          {img ? (
                            <Image
                              src={img}
                              alt={title}
                              fill
                              sizes="80px"
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                href={`/product/${line.merchandise.product.handle}`}
                                onClick={closeCart}
                                className="display text-lg leading-tight block truncate focus:outline-none focus-visible:text-brass"
                              >
                                {title}
                              </Link>
                              {variant && variant !== "Default Title" && (
                                <p className="text-stone text-xs tracking-wider uppercase mt-1">
                                  {variant}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => remove(line.id)}
                              disabled={pending}
                              aria-label={`Remove ${title}`}
                              className="text-stone hover:text-paper text-lg leading-none px-1 -mt-1 disabled:opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
                            >
                              ×
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-3">
                            <div className="flex items-center border border-paper/15">
                              <button
                                onClick={() => update(line.id, line.quantity - 1)}
                                disabled={pending}
                                className="w-8 h-8 text-paper/70 hover:text-paper hover:bg-paper/5 transition-colors disabled:opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
                                aria-label={`Decrease quantity of ${title}`}
                              >
                                −
                              </button>
                              <span
                                className="w-8 h-8 flex items-center justify-center text-sm"
                                aria-live="polite"
                              >
                                {line.quantity}
                              </span>
                              <button
                                onClick={() => update(line.id, line.quantity + 1)}
                                disabled={pending}
                                className="w-8 h-8 text-paper/70 hover:text-paper hover:bg-paper/5 transition-colors disabled:opacity-30 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
                                aria-label={`Increase quantity of ${title}`}
                              >
                                +
                              </button>
                            </div>
                            <span className="text-paper text-sm">{lineTotal}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t border-paper/10">
                  <div className="px-6 py-5 flex items-center justify-between border-b border-paper/10">
                    <p className="text-[11px] tracking-widest uppercase text-stone">
                      Subtotal
                    </p>
                    <p className="display text-2xl">
                      {subtotal
                        ? money(subtotal.amount, subtotal.currencyCode)
                        : "—"}
                    </p>
                  </div>
                  <div className="px-6 py-3 flex items-center justify-between text-stone text-xs">
                    <span>Shipping</span>
                    <span>{freeShipUnlocked ? "Free" : "Calculated at checkout"}</span>
                  </div>
                  <button
                    onClick={closeCart}
                    className="block w-full text-center text-[11px] tracking-widest uppercase text-paper/70 hover:text-paper py-3 border-t border-paper/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
                  >
                    Continue Shopping
                  </button>
                  {configured && checkoutUrl ? (
                    <a
                      href={checkoutUrl}
                      className="block bg-paper text-ink text-center py-5 text-[11px] tracking-widest uppercase hover:bg-brass focus:outline-none focus-visible:ring-1 focus-visible:ring-brass transition-colors"
                    >
                      {pending ? "Updating…" : "Checkout →"}
                    </a>
                  ) : (
                    <div className="block bg-paper/5 border-t border-paper/10 text-center py-5 text-[11px] tracking-widest uppercase text-stone cursor-not-allowed">
                      Connect Shopify to enable checkout
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
