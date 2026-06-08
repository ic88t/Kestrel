"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RITUALS, type Ritual, type ViewProduct } from "@/lib/data";
import ProductCard from "./ProductCard";

type Filter = "all" | Ritual;

export default function ShopGrid({
  products,
  initialFilter = "all"
}: {
  products: ViewProduct[];
  initialFilter?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.ritual === filter)),
    [filter, products]
  );

  return (
    <>
      <div className="sticky top-[var(--header-h)] z-20 bg-ink/85 backdrop-blur-xl border-y border-paper/10 -mx-6 lg:-mx-10 px-6 lg:px-10 py-5 mb-12">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="eyebrow text-stone mr-4 shrink-0">Filter</span>
          {(["all", ...RITUALS.map((r) => r.key)] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 text-[11px] tracking-widest uppercase px-4 py-2 border transition-colors duration-500 ease-smooth ${
                filter === f
                  ? "bg-paper text-ink border-paper"
                  : "border-paper/15 text-paper/70 hover:text-paper hover:border-paper/40"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-stone text-xs tracking-wider shrink-0">
            {filtered.length} formula{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.handle} product={p} i={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="display text-3xl text-stone">No formulas in this ritual yet.</p>
          <button
            onClick={() => setFilter("all")}
            className="mt-6 text-[11px] tracking-widest uppercase border border-paper/30 px-6 py-3 hover:bg-paper hover:text-ink transition-colors duration-500"
          >
            See All →
          </button>
        </div>
      )}
    </>
  );
}
