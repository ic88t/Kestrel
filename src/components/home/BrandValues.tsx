"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const VALUES = [
  {
    title: "Sustainability",
    body:
      "Recyclable amber glass, FSC-certified secondary, refills planned for the regimen in 2026."
  },
  {
    title: "Ethically formulated",
    body:
      "Vegan, cruelty-free, hormone-free, fragrance-free. No sulfates, silicones, parabens, or mineral oil."
  },
  {
    title: "Kestrel Concierge",
    body:
      "Small customer team based in New York. Real replies, in plain English, within one business day."
  },
  {
    title: "Formulated in USA",
    body:
      "Every formula is compounded and bottled in FDA-registered US facilities. No outsourced filling, ever."
  }
];

export default function BrandValues() {
  return (
    <section className="relative bg-ink py-20 md:py-28 px-6 lg:px-10 border-y border-paper/5 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
      >
        <Image
          src="https://cdn.sanity.io/images/g0smbdlu/production/58d5ae9475107c2bab20e4d40247fdcd976319f0-2048x2048.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
          <div>
            <p className="eyebrow text-brass mb-3">The brand</p>
            <h2 className="display text-4xl md:text-6xl leading-[0.95] text-balance">
              What KESTREL<br />
              <span className="italic font-light text-stone">stands for.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-paper/10 border border-paper/10">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-ink p-8 md:p-10 flex flex-col"
            >
              <span className="display text-4xl md:text-5xl text-brass/30 leading-none mb-6">
                0{i + 1}
              </span>
              <h3 className="display text-xl md:text-2xl leading-tight text-balance">
                {v.title}
              </h3>
              <p className="text-paper/60 text-sm leading-relaxed mt-4">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
