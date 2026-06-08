import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromoBar from "@/components/layout/PromoBar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CartDrawer from "@/components/ui/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { SHOPIFY_CONFIGURED } from "@/lib/shopify";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"]
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "KESTREL — Hair Growth The Natural Way",
  description:
    "Clinically tested hair density formulas. 50,000+ men trust Kestrel to help reduce shedding and support growth.",
  openGraph: {
    title: "KESTREL",
    description: "Hair growth the natural way. Clinically tested.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-white text-ink antialiased">
        <CartProvider initialCart={null} configured={SHOPIFY_CONFIGURED}>
          <SmoothScroll />
          <PromoBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
