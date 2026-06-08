"use client";

import { motion } from "framer-motion";

type Props = {
  value: "one-time" | "subscribe";
  onChange: (v: "one-time" | "subscribe") => void;
  basePrice: number;
  currency?: string;
  discountPct?: number;
};

function money(n: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(n);
  } catch {
    return `$${n.toFixed(0)}`;
  }
}

export default function SubscriptionToggle({
  value,
  onChange,
  basePrice,
  currency = "USD",
  discountPct = 25
}: Props) {
  const subPrice = Math.round(basePrice * (1 - discountPct / 100));
  const saving = basePrice - subPrice;

  const Option = ({
    id,
    title,
    price,
    sub,
    badge
  }: {
    id: "one-time" | "subscribe";
    title: string;
    price: number;
    sub: string;
    badge?: string;
  }) => {
    const active = value === id;
    return (
      <button
        type="button"
        role="radio"
        aria-checked={active}
        onClick={() => onChange(id)}
        className={`relative w-full text-left p-5 border transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass ${
          active
            ? "border-brass bg-brass/5"
            : "border-paper/15 hover:border-paper/35"
        }`}
      >
        {badge && (
          <span className="absolute top-3 right-3 eyebrow text-ink bg-brass px-2 py-1 leading-none">
            {badge}
          </span>
        )}
        <div className="flex items-center gap-3">
          <span
            className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${
              active ? "border-brass" : "border-paper/40"
            }`}
          >
            {active && (
              <motion.span
                layoutId="sub-radio-dot"
                className="w-2 h-2 rounded-full bg-brass"
              />
            )}
          </span>
          <span className="display text-lg leading-none">{title}</span>
          <span className="ml-auto text-paper text-base">
            {money(price, currency)}
          </span>
        </div>
        <p className="text-stone text-xs mt-2 pl-7 leading-snug">{sub}</p>
      </button>
    );
  };

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Purchase frequency">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-stone">Choose how often</p>
        <p className="text-brass text-[11px] tracking-wider">
          Save {money(saving, currency)}/order
        </p>
      </div>
      <Option
        id="subscribe"
        title="Subscribe & Save 25%"
        price={subPrice}
        sub="Ships every 60 days. Skip, pause, or cancel from your account at any time."
        badge="Best value"
      />
      <Option
        id="one-time"
        title="One-time purchase"
        price={basePrice}
        sub="No recurring charges. Reorder manually when you finish the bottle."
      />
    </div>
  );
}
