"use client";

import { motion } from "framer-motion";
import type { ViewProduct } from "@/lib/data";

export default function HowToUse({ product }: { product: ViewProduct }) {
  if (product.howTo.length === 0) return null;
  return (
    <section className="py-32 md:py-48 px-6 lg:px-10 bg-paper text-ink">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow text-stone mb-6">Ritual · 03</p>
          <h2 className="display text-5xl md:text-6xl leading-[0.95] text-balance">
            How to use.
          </h2>
          <p className="text-ink/70 text-base mt-8 leading-relaxed max-w-sm">
            The steps are short. The discipline is daily. The compound effect
            is the entire product.
          </p>
        </div>
        <ol className="col-span-12 md:col-span-8 md:pl-10 space-y-px">
          {product.howTo.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-8 py-8 border-t border-ink/10 first:border-t-0"
            >
              <span className="display text-5xl text-stone/70 w-16 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="display text-2xl md:text-3xl leading-tight max-w-2xl">
                {step}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
