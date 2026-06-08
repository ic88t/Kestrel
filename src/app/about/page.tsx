import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-[calc(var(--header-h)+5rem)]">
      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-brass mb-6">The House</p>
          <h1 className="display text-7xl md:text-[12vw] leading-[0.9] text-balance max-w-5xl">
            Built for the<br />
            <span className="italic font-light text-stone">man at 35+.</span>
          </h1>
        </div>
      </section>

      <section className="relative aspect-[16/8] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
      </section>

      <section className="px-6 lg:px-10 py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">
          <p className="col-span-12 md:col-span-4 eyebrow text-stone">
            Origin · MMXXVI
          </p>
          <div className="col-span-12 md:col-span-8 space-y-8 text-paper/80 text-lg md:text-xl leading-relaxed">
            <p>
              KESTREL was founded on a quiet observation. The men we knew —
              architects, surgeons, photographers, fathers, mostly between 38
              and 55 — had stopped shopping the men's aisle. They had outgrown
              the shouting, the colour, the false science. The crown had begun
              to widen. The part had begun to show. They were not ready for
              minoxidil, and the supplements aisle felt like surrender.
            </p>
            <p>
              We thought there was a third option. A small, considered system
              built around actives with a real evidence base — biomimetic
              peptides, rosemary CO₂, saw palmetto, plant-derived oils,
              microbiome-respectful carriers — used in the same order on the
              same days of the week. Priced like an investment, not a purchase.
            </p>
            <p className="text-paper">
              Three serums. Formulated and bottled in the USA, in FDA-registered
              facilities. Designed for the man who has decided that the hair he
              keeps into his fifties was protected at thirty-eight. Patience,
              we believe, is the most undervalued active in the category.
            </p>
            <p className="text-stone italic text-base">
              — The founders, Kestrel
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-32 md:py-48 bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="display text-5xl md:text-7xl leading-[0.95] text-balance max-w-4xl">
            What we will never do.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 mt-16">
            {[
              {
                t: "No miracle claims",
                d: "If a number isn't peer-reviewed, it doesn't go on the bottle."
              },
              {
                t: "No filler actives",
                d: "Every ingredient earns its place. Every concentration is declared."
              },
              {
                t: "No greenwashing",
                d: "We say 'plant-derived' when it is. We say 'synthetic' when it works."
              }
            ].map((b) => (
              <div
                key={b.t}
                className="bg-paper p-10 md:p-12 flex flex-col justify-between min-h-[280px]"
              >
                <span className="display text-2xl md:text-3xl text-balance">
                  {b.t}
                </span>
                <p className="text-ink/70 text-sm leading-relaxed mt-8">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
