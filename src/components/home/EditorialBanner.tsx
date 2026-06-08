"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative h-[90svh] min-h-[600px] overflow-hidden border-t border-paper/5"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-20 md:pb-28"
      >
        <p className="eyebrow text-brass mb-8">Volume 01 · Considered</p>
        <h2 className="display text-6xl md:text-[11vw] leading-[0.88] text-balance max-w-5xl">
          Built for the<br />
          <span className="italic font-light text-stone">long arc.</span>
        </h2>
        <p className="text-paper/70 text-base md:text-xl mt-8 max-w-xl leading-relaxed">
          Eight formulas. Three rituals. One decision — the decision to start
          measuring in years instead of weeks.
        </p>
      </motion.div>
    </section>
  );
}
