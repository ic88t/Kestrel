"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CONCERNS = [
  {
    key: "daily",
    eyebrow: "01 · Daily",
    title: "Botanical Serum",
    sub: "Plant-based AM scalp serum, used every morning.",
    spec: "59 ml · $42 · Rosemary + Ginger + Algae",
    href: "/product/botanical-serum-01",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/af6ba2a9725503fe85127956467ba98061a8d6ab-2048x2048.jpg"
  },
  {
    key: "night",
    eyebrow: "02 · Night",
    title: "Peptide Serum",
    sub: "Five-peptide overnight density serum, Mon/Wed/Fri.",
    spec: "30 ml · $68 · sh-Polypeptide + Saw Palmetto + Rosemary CO₂",
    href: "/product/peptide-serum-02",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/2875e33df3917f8fae8b2cbf5d803c80b719529b-2048x2048.jpg"
  },
  {
    key: "weekly",
    eyebrow: "03 · Weekly",
    title: "Scalp Oil",
    sub: "Cold-pressed pre-wash oil, Sunday evenings.",
    spec: "30 ml · $36 · Jojoba + Argan + Castor + Ginseng",
    href: "/product/scalp-oil-03",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/6e79b8f3fd2d10e8d7a8ae48bc85899fadfb14a2-2048x2048.jpg"
  },
  {
    key: "set",
    eyebrow: "Ritual Set",
    title: "Build your three.",
    sub: "All three serums — saves $17 vs individual.",
    spec: "Botanical · Peptide · Oil · $129 (was $146)",
    href: "/shop?ritual=scalp",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/58d5ae9475107c2bab20e4d40247fdcd976319f0-2048x2048.jpg"
  }
];

export default function ConcernSelector() {
  return (
    <section className="relative bg-ink">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-12">
        <p className="eyebrow text-brass mb-3">The Regimen</p>
        <h2 className="display text-4xl md:text-6xl leading-[0.95] text-balance">
          Three serums.<br />
          <span className="italic font-light text-stone">One density ritual.</span>
        </h2>
        <p className="text-paper/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
          Each serum has a different active stack and a different time of week.
          Used together they form a complete topical density regimen — no
          shampoo overhaul, no daily pill.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10">
        {CONCERNS.map((c, i) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <span className="eyebrow text-brass mb-3">{c.eyebrow}</span>
              <h3 className="display text-3xl md:text-5xl leading-[0.95] text-balance text-paper">
                {c.title}
              </h3>
              <p className="text-paper/70 text-sm md:text-base mt-3 leading-relaxed italic">
                {c.sub}
              </p>
              <p className="text-stone text-[11px] tracking-widest uppercase mt-5 max-w-md">
                {c.spec}
              </p>
              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-paper border border-paper/30 px-5 py-3 self-start hover:bg-paper hover:text-ink transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
              >
                See the formula
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
