"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  "I have noticed hair growth",
  "I'm so glad I've found their products",
  "A hair serum which actually works",
  "My hairdresser noticed the improvement",
  "Much thicker and much healthier",
  "The results are fantastic",
  "Visible difference in just 3 months"
];

function Star() {
  return (
    <svg className="w-3.5 h-3.5 text-forest fill-forest" viewBox="0 0 20 20">
      <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68768 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" />
    </svg>
  );
}

export default function ReviewBar() {
  const all = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white border-b border-ink/10 overflow-hidden py-3"
    >
      <div className="flex w-max gap-8 md:gap-12 items-center animate-marquee whitespace-nowrap">
        <span className="flex items-center gap-2 shrink-0">
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} />)}
          </span>
          <span className="text-sm font-semibold text-ink">4.8</span>
          <span className="text-xs text-ink/50 underline">on Trustpilot</span>
        </span>
        {all.map((review, i) => (
          <span key={i} className="flex items-center gap-2 text-xs text-ink/60 shrink-0">
            <span className="text-ink/30">·</span>
            <span className="italic">"{review}"</span>
            <span className="text-ink/30">·</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
