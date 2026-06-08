"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TILES = [
  {
    src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=900&auto=format&fit=crop",
    label: "Kaolin",
    note: "Pre-blend, 18% w/w"
  },
  {
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop",
    label: "Kelp Extract",
    note: "Mineral co-factor"
  },
  {
    src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=900&auto=format&fit=crop",
    label: "Amber Glass",
    note: "UV-opaque, recyclable"
  },
  {
    src: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=900&auto=format&fit=crop",
    label: "Cold-Press",
    note: "Jojoba, organic"
  },
  {
    src: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=900&auto=format&fit=crop",
    label: "Resin",
    note: "Vetiver dry-down"
  },
  {
    src: "https://images.unsplash.com/photo-1622445275576-721325763afe?q=80&w=900&auto=format&fit=crop",
    label: "Squalane",
    note: "Plant-derived lipid"
  }
];

export default function TextureLibrary() {
  return (
    <section className="relative py-32 md:py-48 px-6 lg:px-10 border-t border-paper/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-16">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-brass">Materials · 03</p>
            <p className="text-stone text-sm mt-3">The raw library.</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="display text-5xl md:text-7xl leading-[0.95] text-balance">
              Six materials.<br />
              <span className="italic font-light text-stone">Photographed honestly.</span>
            </h2>
            <p className="text-paper/60 text-lg mt-8 max-w-xl leading-relaxed">
              No 3D renders. No stock photography of "innovation." Every input
              in every formula, shot exactly as it leaves the supplier.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {TILES.map((t, i) => (
            <motion.figure
              key={t.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={t.src}
                alt={t.label}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-[1.2s] ease-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 text-paper">
                <p className="display text-2xl md:text-3xl leading-none">{t.label}</p>
                <p className="eyebrow text-stone mt-2">{t.note}</p>
              </figcaption>
              <span className="absolute top-3 right-3 eyebrow text-paper bg-ink/40 backdrop-blur px-2 py-1">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
