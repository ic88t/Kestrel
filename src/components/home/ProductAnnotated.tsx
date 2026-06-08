"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const LEFT_CALLOUTS = [
  {
    label: "01",
    title: "Five biomimetic peptides",
    body: "sh-Polypeptide-1, -9, -11 + sh-Oligopeptide-2, -10. Signal the follicle without hormones."
  },
  {
    label: "02",
    title: "Saw palmetto, topically",
    body: "Modulates DHT at the scalp — none of the systemic side-effects of an oral."
  },
  {
    label: "03",
    title: "Rosemary CO₂ extract",
    body: "Standardised, not a perfume oil. Supports scalp vitality and microcirculation."
  }
];

const RIGHT_CALLOUTS = [
  {
    label: "04",
    title: "Visibly thicker in 12 weeks",
    body: "79% of men aged 35–58 reported a fuller-looking part in our cohort. No prescription required."
  },
  {
    label: "05",
    title: "60-day money-back",
    body: "Use it daily for two months. If you're not satisfied, keep the bottle and we refund the order."
  }
];

function Callout({
  side,
  index,
  c
}: {
  side: "left" | "right";
  index: number;
  c: (typeof LEFT_CALLOUTS)[number];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group relative border-t border-paper/15 pt-5 ${
        side === "left" ? "md:text-right md:pr-2" : "md:text-left md:pl-2"
      }`}
    >
      <div
        className={`flex items-baseline gap-3 ${
          side === "left" ? "md:flex-row-reverse" : ""
        }`}
      >
        <span className="display text-2xl md:text-3xl text-brass/60 leading-none">
          {c.label}
        </span>
        <h3 className="display text-base md:text-lg leading-tight text-balance">
          {c.title}
        </h3>
      </div>
      <p
        className={`text-paper/55 text-[13px] leading-relaxed mt-3 max-w-[28ch] ${
          side === "left" ? "md:ml-auto" : ""
        }`}
      >
        {c.body}
      </p>
    </motion.div>
  );
}

export default function ProductAnnotated() {
  return (
    <section className="relative bg-ink text-paper overflow-hidden border-y border-paper/5">
      <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, #9A8868 0%, transparent 55%)"
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <p className="eyebrow text-brass mb-5">The hero · 02</p>
          <h2 className="display text-5xl md:text-7xl leading-[0.95] text-balance">
            Built to get<br />
            <span className="italic font-light text-stone">density right.</span>
          </h2>
          <p className="text-paper/65 text-base md:text-lg mt-6 leading-relaxed max-w-xl mx-auto">
            A five-peptide overnight serum engineered for the man past
            thirty-five. No prescription. No daily pill. No shedding phase.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Left callouts */}
          <div className="md:col-span-3 flex flex-col gap-8 order-2 md:order-1">
            {LEFT_CALLOUTS.map((c, i) => (
              <Callout key={c.label} side="left" index={i} c={c} />
            ))}
          </div>

          {/* Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6 order-1 md:order-2 relative"
          >
            <div className="relative aspect-square md:aspect-[4/5] max-w-[520px] mx-auto">
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              >
                <span
                  className="display leading-none text-paper/[0.05] tracking-tightest"
                  style={{ fontSize: "clamp(160px, 26vw, 360px)" }}
                >
                  02
                </span>
              </span>
              <Image
                src="https://cdn.sanity.io/images/g0smbdlu/production/2875e33df3917f8fae8b2cbf5d803c80b719529b-2048x2048.jpg"
                alt="KESTREL Peptide Serum 02"
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
                className="object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              />
            </div>
          </motion.div>

          {/* Right callouts */}
          <div className="md:col-span-3 flex flex-col gap-8 order-3">
            {RIGHT_CALLOUTS.map((c, i) => (
              <Callout key={c.label} side="right" index={i} c={c} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/product/peptide-serum-02"
            className="group inline-flex items-center justify-center gap-3 bg-paper text-ink hover:bg-brass transition-colors duration-300 text-[12px] md:text-[13px] tracking-[0.25em] uppercase font-medium px-10 py-5 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
          >
            <span>Shop Peptide Serum — $68</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/ritual"
            className="text-[11px] tracking-[0.25em] uppercase text-paper/70 hover:text-paper border-b border-paper/30 pb-0.5"
          >
            Take the diagnostic
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
