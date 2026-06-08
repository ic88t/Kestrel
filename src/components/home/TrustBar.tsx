"use client";

import { motion } from "framer-motion";

const ITEMS = [
  { icon: "bolt", label: "100% Online" },
  { icon: "tag", label: "Clear Pricing" },
  { icon: "truck", label: "Shipped to Your Door" },
  { icon: "shield", label: "FDA-Registered Facility" },
  { icon: "beaker", label: "Clinically Tested Actives" },
  { icon: "clock", label: "60-Day Guarantee" }
];

function TrustIcon({ name }: { name: string }) {
  const props = { className: "w-3.5 h-3.5 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 };
  switch (name) {
    case "bolt":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
    case "tag":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.399l2.243-1.232a2.25 2.25 0 001.037-1.79v-5.818a2.25 2.25 0 00-.659-1.591L15 3.659A2.25 2.25 0 0013.409 3H9.568z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>;
    case "truck":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
    case "shield":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
    case "beaker":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.75 14.5M15 3.104v5.714a2.25 2.25 0 01-.659 1.591L14.25 14.5M15 3.104a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L19.5 14.5M9.75 14.5l.75.75m-3.75-.75l-.75.75m9 0l.75.75m-3.75-.75l-.75.75m-9-1.5h15m-15 0a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25m-15 0V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v7.5" /></svg>;
    case "clock":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    default:
      return null;
  }
}

export default function TrustBar() {
  const all = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="relative bg-smoke border-t border-paper/5 overflow-hidden"
    >
      <div className="flex w-max gap-10 md:gap-16 py-4 animate-marquee whitespace-nowrap">
        {all.map((item, i) => (
          <span key={i} className="flex items-center gap-2.5 text-paper/40">
            <TrustIcon name={item.icon} />
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">{item.label}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
