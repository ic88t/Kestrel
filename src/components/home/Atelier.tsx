"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TILES = [
  {
    src: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=900&auto=format&fit=crop",
    label: "Botanical",
    caption: "Rosemary + ginger + algae complex."
  },
  {
    src: "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?q=80&w=900&auto=format&fit=crop",
    label: "Peptide",
    caption: "Five-peptide stack, saw palmetto base."
  },
  {
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop",
    label: "Cold-press",
    caption: "Jojoba + argan + castor + ginseng."
  },
  {
    src: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=900&auto=format&fit=crop",
    label: "Bottle",
    caption: "Amber glass, dropper, UV-opaque."
  }
];

export default function Atelier() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 px-6 lg:px-10 border-t border-paper/5 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-16">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-brass">Inside the formulas</p>
            <p className="text-stone text-sm mt-3">Photographed honestly.</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="display text-5xl md:text-7xl leading-[0.95] text-balance">
              Three serums.<br />
              <span className="italic font-light text-stone">
                Engineered honestly.
              </span>
            </h2>
          </div>
        </div>

        <motion.div
          style={{ y }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 will-change-transform"
        >
          {TILES.map((t, i) => (
            <motion.figure
              key={t.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative ${
                i === 0 || i === 3
                  ? "aspect-[3/4] md:translate-y-8"
                  : "aspect-[3/4] md:-translate-y-4"
              }`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={t.src}
                  alt={t.caption}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-[1.2s] ease-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="absolute top-3 left-3 eyebrow text-paper bg-ink/40 backdrop-blur px-2 py-1">
                  {String(i + 1).padStart(2, "0")} · {t.label}
                </span>
              </div>
              <figcaption className="mt-3 text-stone text-xs leading-relaxed tracking-wide">
                {t.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <div className="mt-20 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-paper/70 text-base md:text-lg leading-relaxed max-w-md">
              Every KESTREL serum is compounded and bottled in FDA-registered
              US facilities, batch-tested for viscosity, pH, and stability.
              No fragrance houses. No mystery actives. Every ingredient on the
              INCI is something you can Google.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
