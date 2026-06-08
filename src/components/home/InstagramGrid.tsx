"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TILES = [
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop"
];

export default function InstagramGrid() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p className="eyebrow text-brass mb-3">@kestrel</p>
          <h2 className="display text-4xl md:text-6xl leading-[0.95] text-balance">
            From the<br />
            <span className="italic font-light text-stone">community.</span>
          </h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block text-[11px] tracking-[0.22em] uppercase text-paper/70 hover:text-paper border-b border-paper/30 pb-1"
        >
          Follow on Instagram →
        </a>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-6 lg:scroll-pl-10 gap-3 md:gap-4 px-6 lg:px-10 pb-4" style={{ scrollbarWidth: "none" }}>
        {TILES.map((src, i) => (
          <motion.a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="snap-start shrink-0 relative w-[72%] sm:w-[42%] md:w-[22%] aspect-[4/5] overflow-hidden group focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 72vw"
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-[1.2s] ease-smooth"
            />
            <div className="absolute inset-0 bg-ink/30 group-hover:bg-transparent transition-colors duration-500" />
            <span className="absolute top-3 right-3 text-paper text-xs eyebrow opacity-0 group-hover:opacity-100 bg-ink/40 backdrop-blur px-2 py-1 transition-opacity">
              View →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
