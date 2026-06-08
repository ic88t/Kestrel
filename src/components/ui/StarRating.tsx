"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

export default function StarRating({
  rating,
  count,
  size = "md",
  showCount = true,
  href,
  className,
  format = "default"
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  href?: string;
  className?: string;
  format?: "default" | "compact"
}) {
  const uid = useId();
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const partialFill = rating % 1 > 0.7 ? 1 : rating % 1 >= 0.3 ? 0.5 : 0;

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4"
  };

  const textSize = {
    sm: "text-[11px]",
    md: "text-xs",
    lg: "text-sm"
  };

  const Star = ({ fill, index }: { fill: number; index: number }) => {
    const gradId = `${uid}-star-${index}`;
    return (
      <svg
        className={cn(sizeClasses[size], "shrink-0")}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId}>
            <stop offset={`${fill * 100}%`} stopColor="#9A8868" />
            <stop offset={`${fill * 100}%`} stopColor="rgba(244,241,236,0.15)" />
          </linearGradient>
        </defs>
        <path
          d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68768 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
          fill={`url(#${gradId})`}
          stroke={fill > 0 ? "#9A8868" : "rgba(244,241,236,0.2)"}
          strokeWidth="1"
        />
      </svg>
    );
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} fill={1} index={i} />);
    } else if (i === fullStars && (hasHalf || partialFill > 0)) {
      stars.push(<Star key={i} fill={partialFill} index={i} />);
    } else {
      stars.push(<Star key={i} fill={0} index={i} />);
    }
  }

  if (format === "compact" && count !== undefined) {
    const inner = (
      <span className={cn("inline-flex items-center gap-2", className)}>
        <span className="text-paper font-medium">{rating.toFixed(1)}</span>
        <span className="inline-flex items-center gap-0.5">{stars}</span>
        {showCount && (
          <span className={cn(textSize[size], "text-stone tracking-wider")}>
            ({count} Reviews)
          </span>
        )}
      </span>
    );
    if (href) {
      return (
        <a href={href} className="inline-flex hover:opacity-70 transition-opacity">
          {inner}
        </a>
      );
    }
    return inner;
  }

  const inner = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex items-center gap-0.5">{stars}</span>
      {showCount && count !== undefined && (
        <span className={cn(textSize[size], "text-stone tracking-wider")}>
          {count} reviews
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex hover:opacity-70 transition-opacity">
        {inner}
      </a>
    );
  }

  return inner;
}
