"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { ViewProduct } from "@/lib/data";
import StarRating from "@/components/ui/StarRating";

export default function ReviewsSection({ product }: { product: ViewProduct }) {
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest");

  const sortedReviews = useMemo(() => {
    const r = [...product.reviews];
    if (sortBy === "newest") return r.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sortBy === "highest") return r.sort((a, b) => b.rating - a.rating);
    return r.sort((a, b) => a.rating - b.rating);
  }, [product.reviews, sortBy]);

  const ratingBreakdown = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    product.reviews.forEach((r) => {
      const key = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      counts[key]++;
    });
    return counts;
  }, [product.reviews]);

  if (product.reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-24 md:py-32 px-6 lg:px-10 bg-paper text-ink">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-4"
          >
            <p className="eyebrow text-stone mb-6">Reviews</p>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="display text-7xl md:text-8xl leading-none">
                {product.rating.toFixed(1)}
              </span>
              <div className="space-y-1">
                <StarRating rating={product.rating} count={undefined} size="sm" showCount={false} />
                <p className="text-stone text-sm">Based on {product.reviewCount} reviews</p>
              </div>
            </div>

            <div className="space-y-2">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const count = ratingBreakdown[star];
                const pct = product.reviewCount > 0 ? (count / product.reviewCount) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs text-stone w-3">{star}</span>
                    <svg className="w-3 h-3 text-brass shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68768 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" />
                    </svg>
                    <div className="flex-1 h-1.5 bg-ink/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-brass rounded-full"
                      />
                    </div>
                    <span className="text-xs text-stone w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Review list */}
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink/10">
              <p className="text-sm text-stone">
                Showing {sortedReviews.length} of {product.reviewCount} reviews
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone uppercase tracking-wider">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-transparent text-sm text-ink border border-ink/15 px-3 py-1.5 rounded-none focus:outline-none focus:border-brass cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="highest">Highest rated</option>
                  <option value="lowest">Lowest rated</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              {sortedReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="pb-8 border-b border-ink/5 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <StarRating
                      rating={review.rating}
                      showCount={false}
                      size="sm"
                    />
                    {review.verified && (
                      <span className="text-[10px] tracking-wider uppercase text-ink/50 bg-ink/5 px-2 py-0.5">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <h4 className="display text-lg md:text-xl mb-2">{review.title}</h4>
                  <p className="text-ink/70 text-sm leading-relaxed mb-4">{review.body}</p>
                  <div className="flex items-center gap-3 text-xs text-stone">
                    <span className="font-medium text-ink/60">{review.author}</span>
                    {review.productName && (
                      <>
                        <span>·</span>
                        <span className="italic">Reviewing {review.productName}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
