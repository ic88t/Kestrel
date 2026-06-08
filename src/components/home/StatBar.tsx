const STATS = [
  { value: "8", label: "Formulas in the system" },
  { value: "300L", label: "Per batch, hand-poured" },
  { value: "84d", label: "Clinical trial window" },
  { value: "60d", label: "Try, decide, return" }
];

export default function StatBar() {
  return (
    <section className="border-y border-paper/10 bg-ink">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`py-8 md:py-10 ${
              i < STATS.length - 1
                ? "md:border-r border-paper/10"
                : ""
            } ${i < 2 ? "border-b md:border-b-0 border-paper/10" : ""}`}
          >
            <p className="display text-4xl md:text-5xl leading-none">{s.value}</p>
            <p className="text-stone text-xs tracking-widest uppercase mt-3">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
