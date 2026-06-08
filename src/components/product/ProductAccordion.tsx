"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewProduct } from "@/lib/data";

export default function ProductAccordion({ product }: { product: ViewProduct }) {
  const [open, setOpen] = useState<string | null>("description");

  const sections = [
    {
      id: "description",
      title: "Description",
      content: (
        <div className="space-y-4">
          <p className="text-paper/70 leading-relaxed">{product.description}</p>
          {product.claims.length > 0 && (
            <ul className="space-y-2 pt-2">
              {product.claims.map((claim, i) => (
                <li key={i} className="flex items-center gap-3 text-paper/60 text-sm">
                  <span className="text-brass">✦</span>
                  {claim}
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    },
    {
      id: "ingredients",
      title: "Ingredients",
      content:
        product.ingredients.length > 0 ? (
          <div className="space-y-3">
            {product.ingredients.map((ing, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4 py-2 border-b border-paper/5 last:border-0">
                <span className="text-paper text-sm font-medium">{ing.name}</span>
                <span className="text-stone text-xs tracking-wider uppercase shrink-0">{ing.role}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-paper/50 text-sm">Ingredients coming soon.</p>
        )
    },
    {
      id: "how-to-use",
      title: "How to Use",
      content:
        product.howTo.length > 0 ? (
          <ol className="space-y-4">
            {product.howTo.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="display text-brass text-lg shrink-0 w-6">{i + 1}</span>
                <p className="text-paper/70 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-paper/50 text-sm">Usage instructions coming soon.</p>
        )
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: (
        <div className="space-y-4 text-paper/70 text-sm leading-relaxed">
          <p>
            <strong className="text-paper">Free shipping</strong> on all orders over $150. Standard
            shipping $6.95, delivered in 3–5 business days.
          </p>
          <p>
            <strong className="text-paper">60-day returns.</strong> Return for any reason — opened or
            unopened. We&apos;ll send a prepaid label. No questions asked.
          </p>
          <p>
            All orders ship from our FDA-registered facility in California within 24 hours of
            purchase.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="border-t border-paper/10">
      {sections.map((section) => {
        const isOpen = open === section.id;
        return (
          <div key={section.id} className="border-b border-paper/10">
            <button
              onClick={() => setOpen(isOpen ? null : section.id)}
              className="w-full flex items-center justify-between py-5 group text-left"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase text-paper/80 font-medium">
                {section.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-paper/40 text-lg leading-none"
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
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-4">{section.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
