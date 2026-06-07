"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <label className="block text-xs tracking-wider uppercase text-leather-500 mb-3 font-sans">
        Select Size
      </label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              "w-12 h-12 border font-sans text-sm transition-all",
              selected === size
                ? "border-maroon-500 bg-maroon-500 text-white"
                : "border-sand-200 dark:border-leather-600 hover:border-gold-400"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
