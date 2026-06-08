"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    label: "Hair",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop"
  },
  {
    label: "Skin",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
  },
  {
    label: "Diet",
    href: "/journal",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
  },
  {
    label: "Lifestyle",
    href: "/ritual",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
  }
];

export default function MedviHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-ink">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(30,30,30,0.6) 0%, transparent 70%)" }} />

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] tracking-[0.25em] uppercase text-paper/40 mb-6"
        >
          Trusted by <span className="text-paper/70 font-medium">50,000+</span> men
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="display text-4xl md:text-6xl lg:text-[76px] leading-[1.05] tracking-tight max-w-4xl uppercase"
        >
          Hair Loss.
          <br />
          <span className="text-paper/50">Handled.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-paper/50 text-sm md:text-base mt-6 max-w-md leading-relaxed"
        >
          Clinically informed hair density formulas for men who act early.
          No prescriptions. No nonsense. Just science that works.
        </motion.p>

        {/* Section cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-[900px]"
        >
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={section.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-smoke border border-paper/5">
                  <Image
                    src={section.image}
                    alt={section.label}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                </div>
                <div className="flex items-center justify-between mt-3 px-0.5">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-paper/70 font-medium">
                    {section.label}
                  </span>
                  <svg className="w-3.5 h-3.5 text-paper/30 group-hover:text-paper/70 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
