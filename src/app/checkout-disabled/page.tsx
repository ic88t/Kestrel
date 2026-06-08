import Link from "next/link";

export default function CheckoutDisabledPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-[var(--header-h)]">
      <p className="eyebrow text-brass mb-6">Checkout</p>
      <h1 className="display text-6xl md:text-8xl leading-none text-balance max-w-3xl">
        Shopify is not<br />
        <span className="italic font-light text-stone">connected yet.</span>
      </h1>
      <p className="text-paper/60 max-w-lg mt-8 leading-relaxed">
        The cart works end-to-end against mock products. To enable real checkout,
        add Shopify credentials to <code className="text-brass">.env.local</code>{" "}
        and restart the server.
      </p>
      <pre className="text-xs text-stone bg-smoke border border-paper/10 px-6 py-5 mt-10 text-left leading-relaxed">
{`SHOPIFY_STORE_DOMAIN=xxx.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=...`}
      </pre>
      <Link
        href="/"
        className="mt-12 text-[11px] tracking-widest uppercase border border-paper/30 px-8 py-4 hover:bg-paper hover:text-ink transition-colors duration-500 ease-smooth"
      >
        Return Home →
      </Link>
    </div>
  );
}
