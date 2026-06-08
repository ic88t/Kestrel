"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FACTS = [
  {
    stat: "−10%",
    title: "The growth cycle shortens",
    body: "The anagen (growth) phase of each follicle drops by roughly 10% per decade after thirty. The same hair grows for less time before it sheds."
  },
  {
    stat: "−18%",
    title: "Strand diameter narrows",
    body: "Healthy male hair loses 15–20% of its diameter between 35 and 55. Density falls before count falls — the strand is simply finer."
  },
  {
    stat: "↑",
    title: "Sebum reorganises",
    body: "Sebaceous output shifts and slows. The scalp gets drier in some men, more reactive in others. Yesterday's shampoo stops being right."
  },
  {
    stat: "10y",
    title: "Compounding is the entire game",
    body: "Density that holds at 50 was protected at 38. KESTREL is a daily withdrawal from an account that pays back across a decade."
  }
];

export default function BuiltFor35() {
  return (
    <section className="relative bg-paper text-ink py-20 md:py-28 px-6 lg:px-10 border-y border-ink/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4 flex flex-col">
            <p className="eyebrow text-stone mb-3">Designed for 35+</p>
            <p className="text-stone text-sm mb-8">The honest version.</p>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink/5 mt-auto">
              <Image
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900&auto=format&fit=crop"
                alt="A man past thirty-five"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover grayscale"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="eyebrow text-paper bg-ink/40 backdrop-blur px-2.5 py-1">
                  Real biology, not marketing
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display text-5xl md:text-7xl leading-[0.95] text-balance"
            >
              Three quiet shifts<br />
              <span className="italic font-light text-stone">happen after 35.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-ink/70 text-lg mt-8 max-w-xl leading-relaxed"
            >
              None of them are catastrophic. All of them are addressable.
              KESTREL is built around what the literature on aging hair
              actually shows — not what would sell the most product.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border border-ink/10 mt-12">
              {FACTS.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="bg-paper p-8 md:p-10 flex flex-col"
                >
                  <span className="display text-5xl md:text-6xl text-brass leading-none mb-6">
                    {f.stat}
                  </span>
                  <h3 className="display text-xl md:text-2xl leading-tight text-balance">
                    {f.title}
                  </h3>
                  <p className="text-ink/70 text-sm leading-relaxed mt-4">
                    {f.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
