"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useCart } from "@/context/CartContext";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Science", href: "/journal" },
  { label: "Ritual", href: "/ritual" },
  { label: "Support", href: "/contact" }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useCart();
  const count = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 h-[64px] flex items-center justify-between text-ink">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[11px] tracking-[0.12em] uppercase text-ink/70 hover:text-ink transition-colors font-medium"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="display text-xl tracking-tight">KESTREL</span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-1.5 bg-forest text-white text-[11px] tracking-[0.1em] uppercase font-medium px-4 py-2 hover:bg-forest-dark transition-colors"
            >
              Hair Quiz
            </Link>
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="md:hidden p-1"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
            <button
              onClick={openCart}
              className="relative p-1 hover:opacity-70 transition-opacity"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest text-white text-[9px] flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-30 bg-white pt-[64px]"
          >
            <nav className="flex flex-col p-6 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium py-3 border-b border-ink/10 text-ink"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="mt-4 bg-forest text-white text-center text-sm tracking-wider uppercase font-medium py-3"
              >
                Hair Quiz
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
