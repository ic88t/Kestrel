"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ViewProduct } from "@/lib/data";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function ProductCard({ product, i }: { product: ViewProduct; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="block">
        <Link href={`/product/${product.handle}`} className="block">
          <div className="relative aspect-[4/5] bg-smoke overflow-hidden mb-5">
            {product.bottle ? (
              <Image
                src={product.bottle}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1.2s] ease-smooth"
              />
            ) : null}

            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <span className="eyebrow text-paper bg-ink/40 backdrop-blur px-2.5 py-1">
                {product.ritual}
              </span>
              {product.number ? (
                <span className="display text-3xl text-paper mix-blend-difference">
                  {product.number}
                </span>
              ) : null}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-[700ms] ease-smooth">
              <AddToCartButton
                variantId={product.variantId}
                price={product.price}
                currency={product.currency}
                available={product.availableForSale}
                variant="card"
              />
            </div>
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
      </div>
    </motion.div>
  );
}
