import { getAllProducts, type ViewProduct } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";

export default async function RelatedProducts({ current }: { current: ViewProduct }) {
  const all = await getAllProducts();
  const related = all.filter((p) => p.handle !== current.handle).slice(0, 4);
  return (
    <section className="py-32 md:py-48 px-6 lg:px-10 border-t border-paper/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <h2 className="display text-4xl md:text-6xl leading-[0.95]">
            Complete the ritual.
          </h2>
          <a
            href="/shop"
            className="text-[11px] tracking-widest uppercase text-paper/70 hover:text-paper hidden md:inline-block"
          >
            All formulas →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
          {related.map((p, i) => (
            <ProductCard key={p.handle} product={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
