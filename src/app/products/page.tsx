"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import FadeIn from "@/components/ui/FadeIn";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Product } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    size: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  });

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="pt-28 pb-16 section-padding">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-gold-500 font-sans text-xs tracking-[0.3em] uppercase mb-3">
            Our Collections
          </p>
          <h1 className="heading-section text-leather-800 dark:text-sand-50">
            Handcrafted Mojari
          </h1>
        </FadeIn>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="card-luxury p-6 sticky top-28">
              <h2 className="font-display text-lg mb-6 text-leather-800 dark:text-sand-100">
                Filters
              </h2>
              <ProductFilters filters={filters} onChange={handleFilterChange} />
            </div>
          </aside>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="py-20 flex justify-center">
                <LoadingSpinner size="lg" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-leather-400 italic text-lg">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, i) => (
                  <FadeIn key={product._id} delay={(i % 3) * 0.1}>
                    <ProductCard product={product} />
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 pb-16 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
