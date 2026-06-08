"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    key: "cleanse",
    title: "Cleanse",
    blurb: "Three shampoos — daily, weekly, post-training.",
    image:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1600&auto=format&fit=crop"
  },
  {
    key: "condition",
    title: "Condition",
    blurb: "Slip without weight. Protein without crunch.",
    image:
      "https://images.unsplash.com/photo-1607602132700-068258431c6c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    key: "treat",
    title: "Treat",
    blurb: "Reconstructive masks. The deep repair work.",
    image:
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1600&auto=format&fit=crop"
  },
  {
    key: "scalp",
    title: "Scalp",
    blurb: "Density, follicle health, longevity.",
    image:
      "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function CategoryTiles() {
  return (
    <section className="relative bg-ink">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-10">
        <p className="eyebrow text-brass mb-3">Shop by Ritual</p>
        <h2 className="display text-4xl md:text-6xl leading-[0.95] text-balance">
          Four rituals.<br />
          <span className="italic font-light text-stone">Eight formulas.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10">
        {CATEGORIES.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/10] md:aspect-[5/3] overflow-hidden group bg-ink"
          >
            <Image
              src={c.image}
              alt={c.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1.2s] ease-smooth"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <span className="eyebrow text-brass mb-3">
                0{i + 1} · {c.key}
              </span>
              <h3 className="display text-4xl md:text-6xl leading-none text-balance text-paper">
                {c.title}
              </h3>
              <p className="text-paper/70 text-sm md:text-base mt-3 leading-relaxed max-w-md">
                {c.blurb}
              </p>
              <Link
                href={`/shop?ritual=${c.key}`}
                className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-paper border border-paper/30 px-5 py-3 self-start hover:bg-paper hover:text-ink transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
              >
                Explore <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
