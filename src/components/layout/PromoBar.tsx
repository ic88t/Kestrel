const ITEMS = [
  { icon: "check", label: "Dermatologists Recommended" },
  { icon: "truck", label: "Free Shipping on Subscriptions" },
  { icon: "flask", label: "Clinically Tested" },
  { icon: "shield", label: "Money-Back Guarantee" },
  { icon: "star", label: "Trusted by 50,000+ Customers" }
];

function Icon({ name }: { name: string }) {
  const props = { className: "w-3.5 h-3.5 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 };
  switch (name) {
    case "check":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case "truck":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
    case "flask":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.75 14.5M15 3.104v5.714a2.25 2.25 0 01-.659 1.591L14.25 14.5M15 3.104a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L19.5 14.5m-9-1.5h4.5m-4.5 0a2.25 2.25 0 002.25 2.25h.1a2.25 2.25 0 002.25-2.25m-4.5 0V8.25m0 3.75V8.25m0 3.75h4.5m-4.5 0V8.25m0 3.75h4.5" /></svg>;
    case "shield":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
    case "star":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
    default:
      return null;
  }
}

export default function PromoBar() {
  const all = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative z-50 bg-forest text-white text-[10px] tracking-[0.15em] uppercase font-medium">
      <div className="overflow-hidden">
        <div className="flex w-max gap-10 md:gap-14 py-2.5 animate-marquee whitespace-nowrap">
          {all.map((it, i) => (
            <span key={i} className="flex items-center gap-2">
              <Icon name={it.icon} />
              <span>{it.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
