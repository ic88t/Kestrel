import { cn } from "@/lib/cn";

type Props = { items: string[]; className?: string };

export default function Marquee({ items, className }: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-paper/10 py-6",
        className
      )}
    >
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="display text-3xl md:text-4xl tracking-tightest flex items-center gap-16"
          >
            {it}
            <span className="text-brass">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
