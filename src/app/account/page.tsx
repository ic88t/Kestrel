import Link from "next/link";

export const metadata = { title: "Account — KESTREL" };

export default function AccountPage() {
  return (
    <div className="pt-[calc(var(--header-h)+5rem)] pb-32 px-6 lg:px-10 min-h-screen">
      <div className="max-w-[640px] mx-auto text-center">
        <p className="eyebrow text-brass mb-6">Account</p>
        <h1 className="display text-6xl md:text-7xl leading-[0.95] text-balance">
          Sign in.
        </h1>
        <p className="text-paper/60 text-lg mt-8 leading-relaxed">
          KESTREL uses Shop Pay for sign-in and order history. One tap from any
          past order to authenticate.
        </p>
        <form className="mt-12 text-left space-y-5">
          <label className="block">
            <span className="eyebrow text-stone block mb-2">Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full bg-transparent border border-paper/20 px-4 py-3 text-paper outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors"
            />
          </label>
          <button
            type="submit"
            disabled
            className="w-full bg-paper text-ink text-[11px] tracking-widest uppercase py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Sign-in Link (coming soon)
          </button>
        </form>
        <div className="mt-12 border-t border-paper/10 pt-8 text-stone text-sm leading-relaxed">
          <p>
            Need order help meanwhile? Write us at{" "}
            <Link href="mailto:hello@kestrel.co" className="text-brass hover:text-paper">
              hello@kestrel.co
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
