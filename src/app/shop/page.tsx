import Image from "next/image";
import ShopGrid from "@/components/shop/ShopGrid";
import { getAllProducts, type Ritual } from "@/lib/data";

type Search = { ritual?: string };
const VALID: Ritual[] = ["scalp"];

export const revalidate = 60;

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  const products = await getAllProducts();
  const initial = VALID.includes(params.ritual as Ritual)
    ? (params.ritual as Ritual)
    : "all";

  return (
    <div className="pt-[var(--header-h)]">
      <section className="relative h-[60svh] min-h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/30 to-ink" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-16">
          <p className="eyebrow text-brass mb-6">The Collection</p>
          <h1 className="display text-6xl md:text-8xl leading-[0.95] text-balance max-w-4xl">
            Eight formulas.<br />
            <span className="italic font-light text-stone">No noise.</span>
          </h1>
        </div>
      </section>

      <div className="px-6 lg:px-10 pb-32 pt-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-10 mb-12">
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="text-paper/70 text-lg leading-relaxed">
                Built around four rituals — cleanse, condition, treat, scalp.
                The order is suggested. The system is yours.
              </p>
            </div>
          </div>

          <ShopGrid products={products} initialFilter={initial} />
        </div>
      </div>
    </div>
  );
}
