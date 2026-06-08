"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { ViewProduct } from "@/lib/data";
import AddToCartButton from "@/components/ui/AddToCartButton";
import QuantitySelector from "@/components/ui/QuantitySelector";
import SubscriptionToggle from "@/components/ui/SubscriptionToggle";
import StarRating from "@/components/ui/StarRating";

export default function ProductHero({ product }: { product: ViewProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const [qty, setQty] = useState(1);
  const [purchaseMode, setPurchaseMode] = useState<"one-time" | "subscribe">("subscribe");
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] ?? null);
  const isSubscribe = purchaseMode === "subscribe";
  const currentPrice = selectedVariant?.price ?? product.price;
  const displayPrice = isSubscribe ? Math.round(currentPrice * 0.75) : currentPrice;

  return (
    <section
      ref={ref}
      className="relative pt-[var(--header-h)] grid grid-cols-12 gap-6 lg:gap-10 px-6 lg:px-10"
    >
      {/* Image - left column */}
      <div className="col-span-12 md:col-span-7 flex items-center justify-center mt-6">
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="relative w-full max-w-[520px] aspect-square bg-smoke overflow-hidden"
        >
          {product.hero ? (
            <Image
              src={product.hero}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-contain grayscale p-6 md:p-10"
            />
          ) : null}

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-paper bg-ink/40 backdrop-blur px-3 py-1.5"
            >
              {product.ritual}
            </motion.span>
            {product.number ? (
              <motion.span
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="display text-[12vw] md:text-[6vw] leading-none text-paper mix-blend-difference"
              >
                {product.number}
              </motion.span>
            ) : null}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none"
          >
            <span className="eyebrow text-paper bg-ink/40 backdrop-blur px-3 py-1.5">
              ✦ {product.size}
            </span>
            {product.availableForSale && (
              <span className="eyebrow text-brass bg-ink/40 backdrop-blur px-3 py-1.5">
                In stock
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Product info - right column (sticky) */}
      <div className="col-span-12 md:col-span-5 md:sticky md:top-[calc(var(--header-h)+24px)] md:self-start pb-16 pt-6 md:pt-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <a
            href="/shop"
            className="text-[10px] tracking-[0.2em] uppercase text-stone hover:text-paper transition-colors"
          >
            Shop
          </a>
          <span className="text-stone mx-1.5">/</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-paper/50">
            {product.name}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display text-2xl md:text-[28px] lg:text-[32px] leading-[1.1] tracking-tight text-balance uppercase"
        >
          {product.name}
        </motion.h1>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4"
          >
            <StarRating
              rating={product.rating}
              count={product.reviewCount}
              size="sm"
              href="#reviews"
              format="compact"
            />
          </motion.div>
        )}

        {/* Feature tags */}
        {product.claims.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {product.claims.slice(0, 3).map((claim, i) => (
              <span
                key={i}
                className="text-[10px] tracking-wider uppercase text-paper/60 border border-paper/15 px-2.5 py-1"
              >
                {claim}
              </span>
            ))}
          </motion.div>
        )}

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex items-baseline gap-3"
        >
          <motion.span
            key={`${selectedVariant?.id}-${purchaseMode}-${qty}`}
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="display text-3xl md:text-4xl leading-none text-paper"
          >
            ${(displayPrice * qty).toFixed(0)}
          </motion.span>
          {isSubscribe && (
            <span className="text-stone text-sm line-through">
              ${(currentPrice * qty).toFixed(0)}
            </span>
          )}
        </motion.div>

        {/* Variant selector */}
        {product.variants.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-2.5 font-medium">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => {
                const active = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.available}
                    className={`px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase border transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass ${
                      active
                        ? "border-brass bg-brass/10 text-paper"
                        : "border-paper/20 text-paper/60 hover:border-paper/40 hover:text-paper"
                    } ${!variant.available ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Quantity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-2.5 font-medium">Quantity</p>
          <QuantitySelector value={qty} onChange={setQty} size="md" />
        </motion.div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
        >
          <SubscriptionToggle
            value={purchaseMode}
            onChange={setPurchaseMode}
            basePrice={currentPrice}
            currency={product.currency}
            discountPct={25}
          />
        </motion.div>

        {/* Add to cart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 space-y-2.5"
        >
          <AddToCartButton
            variantId={product.variantId}
            price={currentPrice}
            currency={product.currency}
            available={product.availableForSale && (selectedVariant?.available ?? true)}
            quantity={qty}
            subscription={isSubscribe}
            variant="hero"
          />
          <button
            type="button"
            className="block w-full py-3.5 text-[11px] tracking-[0.25em] uppercase border border-paper/25 text-paper hover:bg-paper hover:text-ink transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
          >
            Buy with <span className="font-semibold">Shop</span> Pay
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] tracking-widest uppercase text-stone"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            Free shipping over $150
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            60-day returns
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ships in 24h
          </span>
        </motion.div>
      </div>
    </section>
  );
}
