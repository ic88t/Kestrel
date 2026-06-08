import { ReactNode } from "react";

export default function PolicyPage({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="pt-[calc(var(--header-h)+5rem)] pb-32 px-6 lg:px-10 min-h-screen">
      <div className="max-w-[760px] mx-auto">
        <p className="eyebrow text-brass mb-6">{eyebrow}</p>
        <h1 className="display text-5xl md:text-7xl leading-[0.95] text-balance">
          {title}
        </h1>
        <p className="display text-xl md:text-2xl text-stone italic leading-[1.4] mt-10 text-balance">
          {intro}
        </p>
        <div className="mt-16 space-y-10 text-paper/80 text-base md:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
