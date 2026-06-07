"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Partial<Product>[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
      setOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Mojari..."
            className="w-48 lg:w-56 pl-9 pr-3 py-2 bg-white/60 dark:bg-leather-800/60 border border-sand-200 dark:border-leather-600 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
            aria-label="Search products"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-leather-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </form>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-72 bg-white dark:bg-leather-800 border border-sand-200 dark:border-leather-600 shadow-luxury-lg rounded-sm overflow-hidden z-50">
          {results.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 hover:bg-sand-50 dark:hover:bg-leather-700 transition-colors"
            >
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.title || ""}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-sm"
                />
              )}
              <div>
                <p className="text-sm font-sans text-leather-800 dark:text-sand-100 line-clamp-1">
                  {product.title}
                </p>
                <p className="text-xs text-gold-500">{formatPrice(product.price || 0)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
