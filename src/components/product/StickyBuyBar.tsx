"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewProduct } from "@/lib/data";
import AddToCartButton from "@/components/ui/AddToCartButton";
import QuantitySelector from "@/components/ui/QuantitySelector";

export default function StickyBuyBar({ product }: { product: ViewProduct }) {
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 bg-smoke/95 backdrop-blur-xl border-t border-paper/10"
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-4 flex-1 min-w-0">
              <div className="relative w-12 h-14 shrink-0 bg-ink overflow-hidden">
                {product.bottle && (
                  <Image
                    src={product.bottle}
                    alt={product.name}
                    fill
                    sizes="48px"
                    className="object-cover grayscale"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="display text-lg truncate">{product.name}</p>
                <p className="text-stone text-xs tracking-wider uppercase">
                  {product.size}
                </p>
              </div>
            </div>

            <div className="md:hidden flex-1 min-w-0">
              <p className="display text-base truncate">{product.name}</p>
              <p className="text-stone text-[10px] tracking-wider uppercase">
                ${product.price.toFixed(0)} · {product.size}
              </p>
            </div>

            <QuantitySelector value={qty} onChange={setQty} />

            <div className="flex-shrink-0 min-w-[160px] md:min-w-[280px]">
              <AddToCartButton
                variantId={product.variantId}
                price={product.price}
                currency={product.currency}
                available={product.availableForSale}
                quantity={qty}
                variant="hero"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
