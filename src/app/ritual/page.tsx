import { getAllProducts } from "@/lib/data";
import RitualQuiz from "@/components/ritual/RitualQuiz";

export const revalidate = 60;

export default async function RitualPage() {
  const products = await getAllProducts();
  return (
    <div className="pt-[calc(var(--header-h)+5rem)] pb-32 px-6 lg:px-10 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <p className="eyebrow text-brass mb-6">Ritual Finder</p>
          <h1 className="display text-6xl md:text-8xl leading-[0.95] text-balance max-w-3xl">
            Build your<br />
            <span className="italic font-light text-stone">ritual.</span>
          </h1>
        </div>
        <RitualQuiz products={products} />
      </div>
    </div>
  );
}
