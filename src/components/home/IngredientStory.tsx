"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const INGREDIENTS = [
  { sym: "Pep", num: "01", name: "sh-Polypeptides", note: "Follicular signalling" },
  { sym: "Ros", num: "02", name: "Rosemary CO₂", note: "5α-reductase modulation" },
  { sym: "Saw", num: "03", name: "Saw Palmetto", note: "DHT modulator" },
  { sym: "Gin", num: "04", name: "Ginger Root", note: "Scalp circulation" },
  { sym: "Cas", num: "05", name: "Castor Oil", note: "Strand thickening" },
  { sym: "Pan", num: "06", name: "Panax Ginseng", note: "Follicular stimulant" }
];

export default function IngredientStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 px-6 lg:px-10 bg-paper text-ink overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 select-none pointer-events-none"
        aria-hidden
      >
        <div className="display text-[24vw] md:text-[18vw] leading-none text-ink/[0.04] absolute -top-12 -left-8 tracking-tightest">
          atelier
        </div>
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-20">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-stone">Index 02</p>
            <p className="text-stone/80 text-sm mt-3">The Atelier.</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-5xl md:text-7xl leading-[0.95] text-balance">
              Six actives.<br />
              <span className="italic font-light text-stone">No filler.</span>
            </h2>
            <p className="text-ink/70 text-lg mt-8 max-w-xl leading-relaxed">
              Every Kestrel formula is built around a small set of clinically
              characterised actives. We use them at the concentrations the
              research supports, in carriers chosen to keep them stable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-ink/10">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-paper aspect-square flex flex-col justify-between p-6 md:p-8 group hover:bg-ink hover:text-paper transition-colors duration-700 ease-smooth"
            >
              <div className="flex items-start justify-between">
                <span className="display text-7xl md:text-8xl leading-none">
                  {ing.sym}
                </span>
                <span className="text-[10px] tracking-widest opacity-60">
                  {ing.num}
                </span>
              </div>
              <div>
                <p className="display text-xl">{ing.name}</p>
                <p className="text-xs tracking-wider opacity-60 mt-1">
                  {ing.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
