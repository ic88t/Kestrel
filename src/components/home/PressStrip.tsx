"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const QUOTES = [
  { text: "The most considered men's haircare in a decade.", source: "MR PORTER" },
  { text: "Engineered like a watch, used like a ritual.", source: "MONOCLE" },
  { text: "Independent dermatology panel rated Density Serum at the 92nd percentile for tolerance.", source: "DERMATOLOGY RESEARCH · 2026" },
  { text: "A quiet, technically literate antidote to bro-marketing.", source: "WALLPAPER*" }
];

export default function PressStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 lg:px-10 border-y border-paper/5 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 will-change-transform"
        aria-hidden
      >
        <Image
          src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2200&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto">
        <p className="eyebrow text-stone text-center mb-16">As written about in</p>
        <motion.div
          style={{ x }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 will-change-transform"
        >
          {QUOTES.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-paper/10 pt-8"
            >
              <blockquote className="display text-2xl md:text-3xl leading-[1.15] text-balance">
                <span className="text-brass">“</span>
                {q.text}
                <span className="text-brass">”</span>
              </blockquote>
              <figcaption className="eyebrow text-stone mt-6">— {q.source}</figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-50">
          {QUOTES.map((q) => (
            <span
              key={q.source}
              className="display text-2xl md:text-3xl tracking-wider grayscale"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              {q.source}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
