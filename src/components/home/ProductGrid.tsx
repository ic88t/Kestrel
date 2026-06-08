"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ViewProduct } from "@/lib/data";

export default function ProductGrid({ products }: { products: ViewProduct[] }) {
  return (
    <section className="bg-white py-16 md:py-24 px-5 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-ink/40 mb-3">The Collection</p>
          <h2 className="display text-3xl md:text-4xl tracking-tight text-ink">
            Clever science. Visible results.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.handle}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/product/${product.handle}`} className="group block">
                <div className="relative aspect-[4/5] bg-cream overflow-hidden mb-4">
                  {product.hero && (
                    <Image
                      src={product.hero}
                      alt={product.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  )}
                </div>
                <h3 className="text-base font-semibold text-ink">{product.name}</h3>
                <p className="text-sm text-ink/50 mt-1">{product.tagline}</p>
                <p className="text-sm font-medium text-ink mt-2">Starting at ${product.price}/month</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
