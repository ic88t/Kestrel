"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewProduct } from "@/lib/data";

export default function IngredientDrawer({ product }: { product: ViewProduct }) {
  const [open, setOpen] = useState<number | null>(0);
  if (product.ingredients.length === 0) return null;

  return (
    <section className="py-32 md:py-48 px-6 lg:px-10 border-t border-paper/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-4"
        >
          <p className="eyebrow text-brass mb-6">Atelier · 02</p>
          <h2 className="display text-5xl md:text-6xl leading-[0.95] text-balance">
            Every input,<br />
            <span className="italic font-light text-stone">accounted for.</span>
          </h2>
          <p className="text-paper/60 text-base mt-8 leading-relaxed max-w-sm">
            Concentrations declared. Carriers chosen for stability. Nothing on
            the INCI you cannot Google.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-8 md:pl-10"
        >
          <div className="divide-y divide-paper/10 border-y border-paper/10">
            {product.ingredients.map((ing, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-6 group text-left"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="eyebrow text-stone w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-2xl md:text-3xl">{ing.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs tracking-widest uppercase text-paper/60">
                        {ing.role}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="text-brass text-2xl"
                      >
                        +
                      </motion.span>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 pl-14 pr-4 text-paper/70 text-base leading-relaxed max-w-2xl">
                          {ingredientCopy(ing.name)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ingredientCopy(name: string): string {
  const map: Record<string, string> = {
    "Caffeine 1%":
      "A vasodilator at the follicular bulb. Supports nutrient delivery and counters DHT-driven miniaturisation in early data. Used at 1% — the concentration with the strongest in-vivo support.",
    "Rosemary CO2":
      "Standardised extract carrying ursolic and carnosic acids. A natural 5α-reductase modulator with a small-but-real evidence base versus minoxidil 2% over 6 months.",
    "Niacinamide":
      "Vitamin B3. Balances scalp sebum, reinforces the skin barrier, and reduces low-grade inflammation that can shorten the anagen phase.",
    "Stabilised Biotin":
      "Coenzyme R, stabilised in an oil-soluble carrier so it survives the bottle. Required for keratin synthesis; deficiency is the real story, supplementation is the support.",
    "Decyl Glucoside":
      "A plant-derived non-ionic surfactant. Cleanses without disrupting the scalp microbiome or stripping cuticle lipids.",
    "Panthenol":
      "Provitamin B5. Pre-binds water to the cortex, increases tensile strength, and adds visible body without weight.",
    "Vetiver Oil":
      "A deep, root-note scent profile — smoky, dry, woody. Naturally astringent. Used at perfumery-grade concentration.",
    "Allantoin":
      "Calms inflamed and reactive scalps. Pairs with surfactants to soften the cleanse without losing efficacy.",
    "Salicylic Acid 2%":
      "A beta-hydroxy acid that is lipid-soluble — it travels into the sebum-rich environment of the follicle and dissolves cast material that water-based cleansers can't reach.",
    "Kaolin Clay":
      "A soft, white clay that absorbs roughly 1.5× its weight in sebum without abrading the scalp. The rinse-clean residue is what separates a clarifying wash from a clay mask.",
    "Bisabolol":
      "The active fraction of chamomile. Mediates the BHA sting and reduces the post-cleanse redness response.",
    "Peppermint":
      "Menthol activates the TRPM8 cold-receptor on the scalp. Sensation aside, it slightly increases superficial circulation.",
    "Willow Bark":
      "A natural source of salicin that converts in-situ to salicylic acid. Gentler than synthetic BHA. Good daily-use ceiling.",
    "Tea Tree":
      "Terpinen-4-ol is the bioactive — broad-spectrum antimicrobial at concentrations above 0.5%. Useful where sweat and bacteria meet.",
    "Hydrolysed Wheat Protein":
      "Short peptide chains small enough to penetrate the cuticle. Measurably increases strand diameter and tensile strength on fine hair.",
    "Provitamin B5":
      "Panthenol. Pre-binds water inside the cortex, improves elasticity, and adds a soft halo of body without weight.",
    "Vitamin E":
      "Tocopherol. The standard antioxidant cuticle seal — paired with squalane it dramatically extends shelf-life of an oil blend.",
    "Behentrimonium":
      "A modern cationic conditioner that gives slip without the buildup of older quats. Rinses clean.",
    "Squalane":
      "A stable, plant-derived analogue of human sebum. The benchmark lipid for anhydrous repair.",
    "Ceramide NP":
      "The exact ceramide subtype most depleted in damaged hair. Re-deposits into the cuticle's intercellular cement.",
    "Maleic Acid":
      "The chemistry behind modern bond-repair. Reforms broken disulphide and salt bonds in the cortex.",
    "Argan Oil":
      "High in oleic and linoleic acids. Sits well on porous hair without occluding the cuticle.",
    "Jojoba Oil":
      "Closer to a liquid wax than an oil. Mimics human sebum closely enough to be tolerated by every scalp type.",
    "Copper Peptides (GHK-Cu)":
      "A tri-peptide carrier for copper. Signals follicular dermal-papilla cells back toward the anagen growth phase.",
    "Redensyl":
      "A patented combination of two molecules (DHQG + EGCG2) that targets hair-stem-cell activity. The first peptide complex with measurable density data outside minoxidil.",
    "Stabilised Retinaldehyde":
      "A pre-retinoic-acid form gentler than retinol. Normalises scalp cell turnover without the irritation that kills compliance."
  };
  return (
    map[name] ??
    "A characterised active selected for measurable contribution to the formula. Used at the concentration the literature supports."
  );
}
