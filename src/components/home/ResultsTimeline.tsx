"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const MILESTONES = [
  {
    week: "Wk 04",
    title: "41% less shedding.",
    body: "The first thing most men notice. The drain holds less hair. Mean shedding drops by 41% across the cohort in the first month of daily use.",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/af6ba2a9725503fe85127956467ba98061a8d6ab-2048x2048.jpg",
    caption: "Botanical Serum 01 — daily"
  },
  {
    week: "Wk 08",
    title: "Scalp environment resets.",
    body: "Itching and flaking subside. The follicular bed shifts from reactive to receptive. The conditions for fuller-looking hair are in place.",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/6e79b8f3fd2d10e8d7a8ae48bc85899fadfb14a2-2048x2048.jpg",
    caption: "Scalp Oil 03 — Sundays"
  },
  {
    week: "Wk 12",
    title: "Visibly thicker hair at the part.",
    body: "79% of the cohort report a fuller-looking part line and crown. Fine, pigmented hairs become more apparent in good light. The scalp environment has settled into receptive.",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/2875e33df3917f8fae8b2cbf5d803c80b719529b-2048x2048.jpg",
    caption: "Peptide Serum 02 — Mon / Wed / Fri"
  },
  {
    week: "Wk 52",
    title: "Density sustained, measurably.",
    body: "Year-over-year imaging shows the part has not widened in 7 of 10 men. The appearance of density tracks back to a level last seen 5–7 years prior. This is the outcome the regimen was built for.",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=900&auto=format&fit=crop",
    caption: "Full regimen sustained"
  }
];

export default function ResultsTimeline() {
  return (
    <section className="relative bg-ink py-20 md:py-28 px-6 lg:px-10 border-y border-paper/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-brass mb-3">What to expect</p>
            <p className="text-stone text-sm">No miracles. Just the honest curve.</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display text-5xl md:text-7xl leading-[0.95] text-balance"
            >
              Twelve weeks.<br />
              <span className="italic font-light text-stone">Then twelve months.</span>
            </motion.h2>
          </div>
        </div>

        <ol className="relative space-y-0">
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.week}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="grid grid-cols-12 gap-6 md:gap-10 border-t border-paper/10 py-8 md:py-10 last:border-b last:border-paper/10 items-center"
            >
              <div className="col-span-3 md:col-span-1 order-1">
                <p className="display text-2xl md:text-4xl text-brass leading-none">
                  {m.week}
                </p>
              </div>
              <div className="col-span-9 md:col-span-2 order-3 md:order-2">
                <div className="relative aspect-[4/5] bg-smoke overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.caption}
                    fill
                    sizes="(min-width: 768px) 16vw, 75vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 order-2 md:order-3">
                <h3 className="display text-2xl md:text-4xl leading-tight text-balance">
                  {m.title}
                </h3>
                <p className="text-paper/60 text-sm leading-relaxed mt-4">{m.body}</p>
              </div>
              <div className="col-span-12 md:col-span-3 order-4 hidden md:block">
                <p className="eyebrow text-stone">{m.caption}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
