import Image from "next/image";
import Link from "next/link";
import { JOURNAL } from "@/lib/journal";

export default function JournalPage() {
  return (
    <div className="pt-[calc(var(--header-h)+5rem)] pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <p className="eyebrow text-brass mb-6">The Journal</p>
          <h1 className="display text-6xl md:text-8xl leading-[0.95] text-balance max-w-4xl">
            Reading on<br />
            <span className="italic font-light text-stone">density.</span>
          </h1>
          <p className="text-paper/60 text-lg mt-8 max-w-xl leading-relaxed">
            Long-form essays on hair, scalp, and what discipline looks like
            after thirty-five. Published monthly. Read once, kept forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {JOURNAL.map((entry, i) => (
            <article key={entry.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <Link href={`/journal/${entry.slug}`} className="group block">
                <div
                  className={`relative overflow-hidden mb-6 ${
                    i === 0 ? "aspect-[16/8]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes={i === 0 ? "100vw" : "50vw"}
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1.2s] ease-smooth"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="eyebrow text-brass">{entry.category}</span>
                  <span className="text-stone text-xs">·</span>
                  <span className="text-stone text-xs">{entry.date}</span>
                  <span className="text-stone text-xs">·</span>
                  <span className="text-stone text-xs">{entry.readMin} min</span>
                </div>
                <h2
                  className={`display leading-tight text-balance ${
                    i === 0 ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
                  }`}
                >
                  {entry.title}
                </h2>
                <p className="text-paper/60 text-base md:text-lg mt-4 leading-relaxed max-w-2xl">
                  {entry.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
