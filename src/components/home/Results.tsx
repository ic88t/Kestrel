"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const RESULTS = [
  {
    before: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "After just three months of using the products, I saw a huge difference and felt my hair really blooming. Even my hairdresser noticed the change.",
    tags: ["Receding hairline", "Reduced Hair Loss", "Visibly Thicker Hair"]
  },
  {
    before: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    quote: "It's been 150 days since I started using the routine. I've seen the results — my hair feels thicker, I have a lot of grow out coming. People have noticed.",
    tags: ["Increased hair thickness", "Boosted self-confidence", "Noticeable hair growth"]
  }
];

export default function Results() {
  return (
    <section className="bg-cream py-16 md:py-24 px-5 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-ink/40 mb-3">Real Results</p>
          <h2 className="display text-3xl md:text-4xl tracking-tight text-ink">
            Before & After
          </h2>
        </motion.div>

        <div className="space-y-16">
          {RESULTS.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <Image src={result.before} alt="Before" fill sizes="200px" className="object-cover grayscale" />
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-wider uppercase bg-white/90 px-2 py-1 font-medium">Before</span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <Image src={result.after} alt="After" fill sizes="200px" className="object-cover" />
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-wider uppercase bg-forest text-white px-2 py-1 font-medium">After</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-lg md:text-xl leading-relaxed text-ink/80 italic">
                  "{result.quote}"
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {result.tags.map((tag) => (
                    <span key={tag} className="text-[10px] tracking-wider uppercase bg-forest/10 text-forest px-3 py-1.5 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
