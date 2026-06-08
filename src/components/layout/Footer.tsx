import Link from "next/link";

const COLS = [
  {
    title: "Shop",
    links: [
      { label: "Botanical Serum", href: "/product/botanical-serum-01" },
      { label: "Peptide Serum", href: "/product/peptide-serum-02" },
      { label: "Scalp Oil", href: "/product/scalp-oil-03" },
      { label: "The Ritual Set", href: "/product/scalp-ritual-set" }
    ]
  },
  {
    title: "Discover",
    links: [
      { label: "How It Works", href: "/ritual" },
      { label: "Science", href: "/journal" },
      { label: "About", href: "/about" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="relative bg-forest-dark text-white pt-20 pb-10 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 pb-16">
          <div className="col-span-12 md:col-span-4">
            <Link href="/" className="display text-2xl tracking-tight">
              KESTREL
            </Link>
            <p className="text-white/50 text-sm mt-3 max-w-xs leading-relaxed">
              Clinically informed hair density formulas for men who act early.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title} className="col-span-6 md:col-span-2 md:col-start-6">
              <p className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] tracking-wider uppercase text-white/40">
            © 2026 Kestrel — All rights reserved
          </p>
          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase text-white/40">
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping</Link>
            <Link href="/returns" className="hover:text-white transition-colors">Returns</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
