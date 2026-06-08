"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { ViewProduct } from "@/lib/data";

type Question = {
  key: string;
  prompt: string;
  options: { value: string; label: string }[];
};

const QUESTIONS: Question[] = [
  {
    key: "concern",
    prompt: "What concerns you most this year?",
    options: [
      { value: "scalp", label: "Density & thinning" },
      { value: "prevention", label: "Prevention — keep what I have" },
      { value: "cleanse", label: "Oily scalp & buildup" },
      { value: "dry", label: "Dry, flaky scalp" }
    ]
  },
  {
    key: "frequency",
    prompt: "How often do you wash?",
    options: [
      { value: "daily", label: "Every day" },
      { value: "alt", label: "Every other day" },
      { value: "weekly", label: "2–3 times a week" }
    ]
  },
  {
    key: "training",
    prompt: "Do you train hard?",
    options: [
      { value: "yes", label: "Yes — most days" },
      { value: "sometimes", label: "A few times a week" },
      { value: "no", label: "Rarely" }
    ]
  },
  {
    key: "state",
    prompt: "How would you describe your hair right now?",
    options: [
      { value: "thinning", label: "Thinning at the crown or part" },
      { value: "dry", label: "Dry, brittle, or colour-damaged" },
      { value: "oily", label: "Oily within a day of washing" },
      { value: "balanced", label: "Balanced — maintain, don't fix" }
    ]
  }
];

export default function RitualQuiz({ products }: { products: ViewProduct[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { add, openCart, pending } = useCart();
  const done = step >= QUESTIONS.length;

  const select = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  const recommendations: ViewProduct[] = (() => {
    if (!done) return [];
    const pick = (matcher: (p: ViewProduct) => boolean) => products.find(matcher);
    const list: ViewProduct[] = [];

    // Peptide Serum — anyone with active thinning or scalp concern.
    if (answers.concern === "scalp" || answers.state === "thinning") {
      const peptide = pick((p) => /peptide/i.test(p.name));
      if (peptide) list.push(peptide);
    }

    // Botanical Serum — anyone doing prevention or maintenance.
    const botanical = pick((p) => /botanical/i.test(p.name));
    if (botanical && !list.includes(botanical)) list.push(botanical);

    // Scalp Oil — anyone with dry / flaky / buildup.
    if (
      answers.state === "dry" ||
      answers.state === "oily" ||
      answers.frequency === "daily"
    ) {
      const oil = pick((p) => /scalp oil/i.test(p.name));
      if (oil && !list.includes(oil)) list.push(oil);
    }

    if (list.length === 0) {
      const fallback = pick((p) => /peptide/i.test(p.name)) ?? products[0];
      if (fallback) list.push(fallback);
    }

    return list.slice(0, 3);
  })();

  const addAll = async () => {
    for (const r of recommendations) {
      if (r.variantId) await add(r.variantId, 1);
    }
    openCart();
  };

  return (
    <>
      {!done && (
        <div className="mb-12 flex items-center gap-2">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-px flex-1 transition-colors duration-500 ${
                i <= step ? "bg-brass" : "bg-paper/15"
              }`}
            />
          ))}
          <span className="ml-4 eyebrow text-stone">
            {String(step + 1).padStart(2, "0")} /{" "}
            {String(QUESTIONS.length).padStart(2, "0")}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-12 gap-10 items-start"
          >
            <h2 className="col-span-12 md:col-span-5 display text-4xl md:text-5xl leading-[1.05] text-balance">
              {QUESTIONS[step].prompt}
            </h2>
            <div className="col-span-12 md:col-span-7 grid grid-cols-1 gap-px bg-paper/10 border border-paper/10">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => select(QUESTIONS[step].key, opt.value)}
                  className="bg-ink hover:bg-paper hover:text-ink transition-colors duration-500 ease-smooth py-6 px-6 text-left flex items-center justify-between group"
                >
                  <span className="display text-2xl">{opt.label}</span>
                  <span className="text-brass opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                    →
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="display text-4xl md:text-6xl leading-[0.95] text-balance mb-12 max-w-3xl">
              Your ritual<br />
              <span className="italic font-light text-stone">is ready.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {recommendations.map((p, i) => (
                <motion.div
                  key={p.handle}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.7 }}
                  className="border border-paper/10 p-8 hover:bg-paper/[0.02] transition-colors duration-500"
                >
                  <span className="display text-5xl text-stone">0{i + 1}</span>
                  <h3 className="display text-3xl mt-6">{p.name}</h3>
                  <p className="text-paper/60 text-sm mt-3 leading-relaxed">
                    {p.tagline}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="display text-2xl">
                      ${p.price.toFixed(0)}
                    </span>
                    <Link
                      href={`/product/${p.handle}`}
                      className="text-[11px] tracking-widest uppercase border border-paper/30 px-4 py-2 hover:bg-paper hover:text-ink transition-colors duration-500"
                    >
                      View →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={addAll}
                disabled={pending || recommendations.length === 0}
                className="bg-paper text-ink hover:bg-brass disabled:opacity-50 disabled:cursor-not-allowed text-[11px] tracking-widest uppercase px-8 py-4 transition-colors duration-500"
              >
                {pending ? "Adding…" : "Add All to Bag →"}
              </button>
              <button
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                }}
                className="text-[11px] tracking-widest uppercase text-paper/70 hover:text-paper"
              >
                Restart →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
