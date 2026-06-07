"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import FadeIn from "@/components/ui/FadeIn";
import type { Product } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="pt-28 pb-16 section-padding">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <h1 className="heading-section text-leather-800 dark:text-sand-50">
            Search Results
          </h1>
          {query && (
            <p className="font-body text-leather-500 mt-2">
              Showing results for &ldquo;{query}&rdquo;
            </p>
          )}
        </FadeIn>

        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center font-body text-leather-400 italic py-16">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <FadeIn key={product._id} delay={i * 0.05}>
                <ProductCard product={product as Product} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
