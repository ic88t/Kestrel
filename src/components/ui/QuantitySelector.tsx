"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  size?: "md" | "lg";
};

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 9,
  size = "md"
}: Props) {
  const dim = size === "lg" ? "h-14 w-14 text-lg" : "h-11 w-11 text-base";
  const display = size === "lg" ? "h-14 w-14 text-xl" : "h-11 w-11 text-base";
  return (
    <div className="inline-flex items-stretch border border-paper/20 select-none">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${dim} flex items-center justify-center text-paper/70 hover:text-paper hover:bg-paper/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brass`}
      >
        −
      </button>
      <div
        className={`${display} flex items-center justify-center border-x border-paper/20 overflow-hidden relative`}
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute display text-paper"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`${dim} flex items-center justify-center text-paper/70 hover:text-paper hover:bg-paper/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brass`}
      >
        +
      </button>
    </div>
  );
}
