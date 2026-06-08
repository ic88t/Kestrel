import Image from "next/image";
import Link from "next/link";
import type { ViewProduct } from "@/lib/data";

export default function QuickLinks({ products }: { products: ViewProduct[] }) {
  return (
    <section className="bg-paper text-ink py-20 md:py-28 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 mb-12">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow text-stone mb-3">Browse the regimen</p>
            <h2 className="display text-4xl md:text-6xl leading-[0.95] text-balance">
              Pick a serum.<br />
              <span className="italic font-light text-stone">Start the ritual.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-10">
            <p className="text-ink/70 text-base md:text-lg leading-relaxed max-w-xl">
              Each KESTREL serum is a complete formula on its own. Most men
              start with the one that maps to their primary concern, then add
              the other two as the ritual settles in.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {products.map((p) => (
            <Link
              key={p.handle}
              href={`/product/${p.handle}`}
              className="group bg-paper p-6 md:p-8 flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
            >
              <div className="relative aspect-[4/5] bg-ink/5 overflow-hidden mb-6">
                {p.bottle && (
                  <Image
                    src={p.bottle}
                    alt={p.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1.2s] ease-smooth"
                  />
                )}
                <div className="absolute top-3 left-3">
                  <span className="eyebrow bg-ink text-paper px-2 py-1">
                    {p.number}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="display text-2xl leading-tight">{p.name}</h3>
                <span className="text-ink text-sm tracking-wider shrink-0">
                  ${p.price.toFixed(0)}
                </span>
              </div>
              <p className="text-ink/65 text-sm leading-relaxed mb-5 line-clamp-2">
                {p.tagline}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-brass border-b border-brass/40 self-start pb-0.5 group-hover:gap-3 transition-all duration-300">
                See the formula <span>→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {[
            {
              label: "Ritual Set",
              sub: "All three — save $17",
              href: "/shop?ritual=scalp"
            },
            {
              label: "Find your regimen",
              sub: "4-question diagnostic",
              href: "/ritual"
            },
            {
              label: "Read the journal",
              sub: "Long-form on density",
              href: "/journal"
            }
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group bg-paper px-6 md:px-8 py-5 flex items-center justify-between hover:bg-ink/[0.03] transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brass"
            >
              <div>
                <p className="display text-xl leading-none">{l.label}</p>
                <p className="text-stone text-xs tracking-wider uppercase mt-1.5">
                  {l.sub}
                </p>
              </div>
              <span className="text-stone group-hover:text-brass group-hover:translate-x-1 transition-all duration-300">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
