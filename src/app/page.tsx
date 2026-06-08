import Hero from "@/components/home/Hero";
import ReviewBar from "@/components/home/ReviewBar";
import ProductGrid from "@/components/home/ProductGrid";
import Results from "@/components/home/Results";
import FAQ from "@/components/home/FAQ";
import { getAllProducts } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <Hero />
      <ReviewBar />
      <ProductGrid products={products} />
      <Results />
      <FAQ />
    </>
  );
}
