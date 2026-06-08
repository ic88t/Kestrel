"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ViewProduct } from "@/lib/data";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function Collection({ products }: { products: ViewProduct[] }) {
  return (
    <section className="relative py-32 md:py-48 px-6 lg:px-10 border-t border-paper/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-20">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-brass">Index 01</p>
            <p className="text-stone text-sm mt-3">The collection.</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-5xl md:text-7xl leading-[0.95] text-balance">
              Engineered,<br />
              <span className="italic font-light text-stone">in order.</span>
            </h2>
            <p className="text-paper/60 text-lg mt-8 max-w-xl leading-relaxed">
              Three shampoos. One conditioner. One overnight mask. Three scalp
              serums. Used in the order shown. Nothing extra.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product, i) => (
            <motion.div
              key={product.handle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: (i % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group"
            >
              <Link
                href={`/product/${product.handle}`}
                className="block relative aspect-[4/5] bg-smoke overflow-hidden mb-5"
              >
                {product.bottle ? (
                  <Image
                    src={product.bottle}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1.2s] ease-smooth"
                  />
                ) : null}

                <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
                  <span className="eyebrow text-paper bg-ink/40 backdrop-blur px-2.5 py-1">
                    {product.ritual}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 display text-[10vw] md:text-[5vw] leading-none text-paper mix-blend-difference pointer-events-none">
                  {product.number}
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 p-4 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-[700ms] ease-smooth"
                  onClickCapture={(e) => e.preventDefault()}
                >
                  <AddToCartButton
                    variantId={product.variantId}
                    price={product.price}
                    currency={product.currency}
                    available={product.availableForSale}
                    variant="card"
                  />
                </div>
              </Link>

              <Link href={`/product/${product.handle}`} className="block">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="display text-xl leading-tight">{product.name}</h3>
                    <p className="text-stone text-xs tracking-wider uppercase mt-1">
                      {product.size}
                    </p>
                  </div>
                  <span className="text-paper text-sm tracking-wider">
                    ${product.price.toFixed(0)}
                  </span>
                </div>
                <p className="text-paper/50 text-sm mt-3 leading-relaxed line-clamp-2">
                  {product.tagline}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-paper/10 pt-10">
          <p className="display text-2xl md:text-3xl text-balance max-w-md">
            Eight formulas. <span className="text-stone italic font-light">Nothing extra.</span>
          </p>
          <Link
            href="/shop"
            className="text-[11px] tracking-widest uppercase border border-paper/30 px-6 py-3 hover:bg-paper hover:text-ink transition-colors duration-500 ease-smooth"
          >
            Shop Collection →
          </Link>
        </div>
      </div>
    </section>
  );
}
