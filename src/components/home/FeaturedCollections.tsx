"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function FeaturedCollections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-white dark:bg-leather-800/50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-gold-500 font-sans text-xs tracking-[0.3em] uppercase mb-3">
            Curated Selection
          </p>
          <h2 className="heading-section text-leather-800 dark:text-sand-50 mb-4">
            Featured Collections
          </h2>
          <p className="font-body text-leather-500 dark:text-sand-300 max-w-xl mx-auto">
            Discover our most coveted handcrafted Mojari for women and men — each piece a testament to
            Rajasthani royal craftsmanship.
          </p>
        </FadeIn>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <FadeIn key={product._id} delay={i * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn delay={0.4} className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-wider uppercase text-maroon-500 hover:text-maroon-600 transition-colors group"
          >
            View All Collections
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
