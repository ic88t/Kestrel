"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const STEPS = [
  {
    badge: "Every morning",
    handle: "botanical-serum-01",
    name: "Botanical Serum",
    number: "01",
    instruction: "6–8 drops to dry scalp. Massage 1–2 minutes. Don't rinse.",
    time: "≈ 2 min",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/af6ba2a9725503fe85127956467ba98061a8d6ab-2048x2048.jpg"
  },
  {
    badge: "Mon · Wed · Fri night",
    handle: "peptide-serum-02",
    name: "Peptide Serum",
    number: "02",
    instruction: "4–6 drops along the part line before bed. Massage gently. Sleep.",
    time: "≈ 3 min",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/2875e33df3917f8fae8b2cbf5d803c80b719529b-2048x2048.jpg"
  },
  {
    badge: "Sunday evening",
    handle: "scalp-oil-03",
    name: "Scalp Oil",
    number: "03",
    instruction: "1 drop per scalp section, 20 minutes before shampoo. Once a week.",
    time: "≈ 3 min + soak",
    image:
      "https://cdn.sanity.io/images/g0smbdlu/production/6e79b8f3fd2d10e8d7a8ae48bc85899fadfb14a2-2048x2048.jpg"
  }
];

export default function WeeklyRitual() {
  return (
    <section className="relative bg-paper text-ink py-20 md:py-28 px-6 lg:px-10 border-y border-ink/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-stone mb-3">The weekly ritual</p>
            <p className="text-stone text-sm">Eight minutes a day.</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display text-5xl md:text-7xl leading-[0.95] text-balance"
            >
              How the regimen<br />
              <span className="italic font-light text-stone">fits a week.</span>
            </motion.h2>
            <p className="text-ink/70 text-base md:text-lg mt-8 max-w-xl leading-relaxed">
              Three products, three different cadences. Total time investment
              per week — about 50 minutes, most of it overlapping with what you
              already do before and after the shower.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.handle}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Link href={`/product/${s.handle}`} className="block group">
                <div className="relative aspect-[4/5] bg-ink/5 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1.2s] ease-smooth"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="eyebrow bg-ink text-paper px-3 py-1.5">
                      Step {i + 1}
                    </span>
                    <span className="display text-3xl text-ink/40">
                      {s.number}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="eyebrow bg-paper text-ink px-2.5 py-1">
                      {s.badge}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="display text-2xl leading-tight">{s.name}</h3>
                  <span className="eyebrow text-stone shrink-0">{s.time}</span>
                </div>
                <p className="text-ink/70 text-sm mt-3 leading-relaxed">
                  {s.instruction}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-brass border-b border-brass/40 pb-0.5">
                  See the formula
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 items-center border-t border-ink/10 pt-10">
          <p className="col-span-12 md:col-span-8 display text-2xl md:text-3xl text-balance">
            Or take all three together.{" "}
            <span className="text-stone italic">Save $17 with the Ritual Set.</span>
          </p>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Link
              href="/shop?ritual=scalp"
              className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-brass hover:text-ink text-[11px] tracking-[0.25em] uppercase px-8 py-4 transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
            >
              Shop the Set <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
