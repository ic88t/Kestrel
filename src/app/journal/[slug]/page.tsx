import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JOURNAL } from "@/lib/journal";

export function generateStaticParams() {
  return JOURNAL.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = JOURNAL.find((j) => j.slug === slug);
  if (!entry) return { title: "Not found" };
  return {
    title: `${entry.title} — KESTREL Journal`,
    description: entry.excerpt
  };
}

const BODY: Record<string, string[]> = {
  "the-science-of-density": [
    "For decades, the conversation around hair density has been a referendum on minoxidil. It works for some men, fails for others, and asks for a daily compliance commitment that few will sustain past month four.",
    "The newer story is more interesting. Caffeine at the follicular bulb, rosemary CO₂ extract as a natural 5α-reductase modulator, copper peptides signalling dermal-papilla cells toward the anagen phase, redensyl recruiting stem cells from the bulge — none of these are minoxidil-class on their own. Stacked, applied with discipline, they produce measurable density change over a 12-week window.",
    "Density is not a destination. It is a daily withdrawal from a small account that compounds for years."
  ],
  "rituals-not-routines": [
    "A routine is something you do because it is what you do. A ritual is something you do because you have decided to.",
    "The Kestrel system is built on the second word. Four products applied in the same order on the same days. Density Serum in the morning. Daily Shampoo or Sport Wash before training. Clarifying Shampoo on Sunday evening. Night Density Serum, on the part line, three nights a week.",
    "The compound effect is the product."
  ],
  "what-aging-asks-of-hair": [
    "Three quiet shifts happen to the male scalp after thirty-five. Sebum production reorganises. Strand diameter narrows. The hair cycle shortens.",
    "None of these are catastrophic. All of them are addressable. The corrections are not aggressive — they are consistent. A pH-balanced wash, a weekly clarifier, a daily scalp serum, an occasional reconstructive mask, and patience.",
    "The men who hold their hair in their fifties do not start at fifty. They started at thirty-five."
  ]
};

export default async function JournalArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = JOURNAL.find((j) => j.slug === slug);
  if (!entry) notFound();

  const body = BODY[slug] ?? [
    "This article is being written. Subscribe to the journal to be notified when it publishes."
  ];

  return (
    <article className="pt-[var(--header-h)]">
      <header className="relative h-[65svh] min-h-[460px] overflow-hidden">
        <Image
          src={entry.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink" />
        <div className="absolute inset-0 max-w-[1100px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="eyebrow text-brass">{entry.category}</span>
            <span className="text-stone text-xs">·</span>
            <span className="eyebrow text-stone">{entry.date}</span>
            <span className="text-stone text-xs">·</span>
            <span className="eyebrow text-stone">{entry.readMin} min</span>
          </div>
          <h1 className="display text-5xl md:text-7xl leading-[0.95] text-balance max-w-3xl">
            {entry.title}
          </h1>
        </div>
      </header>

      <div className="max-w-[680px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        <p className="display text-2xl md:text-3xl text-stone italic leading-[1.4] mb-12 text-balance">
          {entry.excerpt}
        </p>
        <div className="space-y-8 text-paper/85 text-lg leading-relaxed">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-20 border-t border-paper/10 pt-10">
          <Link
            href="/journal"
            className="text-[11px] tracking-widest uppercase text-paper/70 hover:text-paper"
          >
            ← All journal entries
          </Link>
        </div>
      </div>
    </article>
  );
}
