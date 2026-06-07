"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import type { Review } from "@/types";

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ customerName: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((r) => r.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []));
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productId }),
      });
      if (!res.ok) throw new Error();
      toast.success("Review submitted for approval");
      setForm({ customerName: "", rating: 5, comment: "" });
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-sand-200 dark:border-leather-700">
      <FadeIn>
        <h2 className="heading-section text-leather-800 dark:text-sand-50 mb-8">
          Customer Reviews
        </h2>
      </FadeIn>

      {reviews.length > 0 && (
        <div className="space-y-4 mb-10">
          {reviews.map((review) => (
            <div key={review._id} className="card-luxury p-6">
              <div className="flex gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-leather-600 dark:text-sand-300 italic">
                &ldquo;{review.comment}&rdquo;
              </p>
              <p className="text-sm text-leather-400 mt-2">— {review.customerName}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-luxury p-6 space-y-4 max-w-lg">
        <h3 className="font-display text-lg">Write a Review</h3>
        <Input
          label="Your Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          required
        />
        <div>
          <label className="block text-sm text-leather-600 mb-1.5">Rating</label>
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            className="input-field"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </div>
        <Textarea
          label="Your Review"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          required
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </section>
  );
}
