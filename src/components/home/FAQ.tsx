"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Does KESTREL actually work?",
    a: "In a 12-week panel of 218 men aged 35–58, 79% reported visibly thicker, fuller-looking hair at the part line and crown. 91% saw a measurable reduction in shedding. Results vary by starting density and consistency of use. The stack — biomimetic peptides, saw palmetto, rosemary CO₂, ginger root — is chosen specifically for the published evidence behind scalp health and the appearance of fuller hair."
  },
  {
    q: "How is this different from minoxidil?",
    a: "Minoxidil is a pharmaceutical vasodilator with an FDA monograph. It works for many men, but comes with a shedding phase and a daily compliance ceiling. KESTREL is a cosmeceutical density regimen using different mechanisms — follicular signalling peptides, DHT modulation, and scalp circulation support — without the shed-phase and without a prescription. Many men use both."
  },
  {
    q: "How long until I see results?",
    a: "Most men notice less shedding inside four weeks. A visibly fuller appearance at the part line typically shows at twelve weeks. The most sustained density support sits around the twelve-month mark. Hair has a slow cycle — this is designed for daily use over years, not months."
  },
  {
    q: "I'm 38 and just starting to notice thinning. Is it too early?",
    a: "It is exactly the right time. Density that holds at 50 was protected at 38. The men who keep their hair into their fifties did not start in their fifties — they started when the early shifts were still small enough to slow."
  },
  {
    q: "What if it doesn't work for me?",
    a: "Use KESTREL daily for up to 60 days. If you're unsatisfied, email hello@kestrel.co — we refund the full purchase price. No restock fees. No paperwork. We cover return shipping in the US, UK, EU, and Canada."
  },
  {
    q: "Is KESTREL independent?",
    a: "Yes. Founder-owned. Every serum is compounded and bottled in FDA-registered US facilities, batch-tested before it leaves. No outside capital. No plans to sell."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-ink py-20 md:py-28 px-6 lg:px-10 border-t border-paper/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow text-paper/40 mb-3">FAQ</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="display text-4xl md:text-5xl leading-[1.05] text-balance uppercase"
          >
            Straight
            <br />
            <span className="text-paper/40">Answers.</span>
          </motion.h2>
          <p className="text-paper/50 text-base mt-8 leading-relaxed max-w-sm">
            Six questions every man asks before starting. No marketing. No fluff.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 md:pl-10">
          <ul className="divide-y divide-paper/10 border-y border-paper/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-paper/30"
                  >
                    <span className="display text-lg md:text-xl leading-tight text-balance text-paper/90">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-paper/40 text-2xl shrink-0 leading-none"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 pr-10 text-paper/60 text-base leading-relaxed max-w-2xl">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-paper/40 text-sm">
            Question we missed?{" "}
            <a className="text-paper/70 hover:text-paper underline underline-offset-4" href="mailto:hello@kestrel.co">
              hello@kestrel.co
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
