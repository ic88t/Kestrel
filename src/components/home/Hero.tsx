"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a2e1a 0%, #2d3d2d 35%, #4a5a4a 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[520px] lg:min-h-[600px] py-16 lg:py-0">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <h1 className="display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] text-white tracking-tight max-w-lg">
              Hair growth the natural way
            </h1>
            <p className="text-white/70 text-base md:text-lg mt-5 max-w-md leading-relaxed">
              50,000+ users trust our clinically tested formulation to help reduce shedding and support growth.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-forest text-white text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3.5 hover:bg-forest-dark transition-colors"
              >
                Shop Men
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-ink text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3.5 hover:bg-white/90 transition-colors"
              >
                Shop Women
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px] aspect-[4/3]">
              <Image
                src="/hero-product.jpg"
                alt="Kestrel hair products"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-contain"
              />
            </div>

            {/* Floating product card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 right-4 lg:bottom-12 lg:right-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center gap-3"
            >
              <div className="relative w-10 h-10 rounded overflow-hidden bg-white/20">
                <Image
                  src="https://cdn.sanity.io/images/g0smbdlu/production/af6ba2a9725503fe85127956467ba98061a8d6ab-2048x2048.jpg"
                  alt="Botanical Serum"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white text-xs font-medium">Botanical Serum</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Clinically Tested</p>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
