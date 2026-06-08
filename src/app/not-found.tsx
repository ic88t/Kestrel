import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-brass mb-6">404</p>
      <h1 className="display text-7xl md:text-9xl leading-none">
        Off the<br />
        <span className="italic font-light text-stone">trail.</span>
      </h1>
      <p className="text-paper/60 max-w-md mt-8 leading-relaxed">
        The page you were looking for has migrated. Return to the collection.
      </p>
      <Link
        href="/"
        className="mt-12 text-[11px] tracking-widest uppercase border border-paper/30 px-8 py-4 hover:bg-paper hover:text-ink transition-colors duration-500 ease-smooth"
      >
        Return Home →
      </Link>
    </div>
  );
}
