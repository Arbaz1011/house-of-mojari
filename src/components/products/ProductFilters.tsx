"use client";

import { PRODUCT_CATEGORIES, PRODUCT_SIZES, PRODUCT_COLORS } from "@/types";

interface ProductFiltersProps {
  filters: {
    category: string;
    size: string;
    color: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs tracking-wider uppercase text-leather-500 mb-2 font-sans">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange("category", e.target.value)}
          className="input-field"
        >
          <option value="">All Categories</option>
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs tracking-wider uppercase text-leather-500 mb-2 font-sans">
          Size
        </label>
        <select
          value={filters.size}
          onChange={(e) => onChange("size", e.target.value)}
          className="input-field"
        >
          <option value="">All Sizes</option>
          {PRODUCT_SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs tracking-wider uppercase text-leather-500 mb-2 font-sans">
          Color
        </label>
        <select
          value={filters.color}
          onChange={(e) => onChange("color", e.target.value)}
          className="input-field"
        >
          <option value="">All Colors</option>
          {PRODUCT_COLORS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs tracking-wider uppercase text-leather-500 mb-2 font-sans">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange("minPrice", e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange("maxPrice", e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-wider uppercase text-leather-500 mb-2 font-sans">
          Sort By
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onChange("sort", e.target.value)}
          className="input-field"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
}
