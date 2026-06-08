"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ViewProduct } from "@/lib/data";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function BestSellers({ products }: { products: ViewProduct[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-28 bg-ink">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p className="eyebrow text-brass mb-3">Best Sellers</p>
          <h2 className="display text-4xl md:text-6xl leading-[0.95] text-balance">
            What the men<br />
            <span className="italic font-light text-stone">come back for.</span>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="w-11 h-11 border border-paper/20 hover:bg-paper hover:text-ink transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="w-11 h-11 border border-paper/20 hover:bg-paper hover:text-ink transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-6 lg:scroll-pl-10 gap-4 md:gap-6 px-6 lg:px-10 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p, i) => (
          <motion.div
            key={p.handle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="snap-start shrink-0 w-[72%] sm:w-[44%] md:w-[30%] lg:w-[23%] group"
          >
            <Link
              href={`/product/${p.handle}`}
              className="block relative aspect-[4/5] bg-smoke overflow-hidden mb-4"
            >
              {p.bottle && (
                <Image
                  src={p.bottle}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 75vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1.2s] ease-smooth"
                />
              )}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
                <span className="eyebrow text-paper bg-ink/40 backdrop-blur px-2.5 py-1">
                  {p.ritual}
                </span>
                {p.number && (
                  <span className="display text-2xl text-paper mix-blend-difference">
                    {p.number}
                  </span>
                )}
              </div>
            </Link>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="display text-lg leading-tight truncate">{p.name}</h3>
                <p className="text-stone text-[11px] tracking-wider uppercase mt-1">
                  {p.size}
                </p>
              </div>
              <span className="text-paper text-sm tracking-wider shrink-0">
                ${p.price.toFixed(0)}
              </span>
            </div>
            <div className="mt-3">
              <AddToCartButton
                variantId={p.variantId}
                price={p.price}
                currency={p.currency}
                available={p.availableForSale}
                variant="card"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
