import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllHandles, getProductByHandle } from "@/lib/data";
import ProductHero from "@/components/product/ProductHero";
import ProductAccordion from "@/components/product/ProductAccordion";
import ReviewsSection from "@/components/product/ReviewsSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyBuyBar from "@/components/product/StickyBuyBar";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const handles = await getAllHandles();
    return handles.map((handle) => ({ handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.name} — KESTREL`,
    description: product.tagline || product.description.slice(0, 150),
    openGraph: {
      title: `${product.name} — KESTREL`,
      description: product.tagline,
      images: product.hero ? [product.hero] : []
    }
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  return (
    <>
      <ProductHero product={product} />
      
      {/* Product details accordion */}
      <section className="py-16 md:py-20 px-6 lg:px-10 border-t border-paper/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <h2 className="display text-3xl md:text-4xl leading-[1.05] text-balance">
              Product
              <br />
              <span className="italic font-light text-stone">details.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7">
            <ProductAccordion product={product} />
          </div>
        </div>
      </section>

      <ReviewsSection product={product} />
      <RelatedProducts current={product} />
      <StickyBuyBar product={product} />
    </>
  );
}
