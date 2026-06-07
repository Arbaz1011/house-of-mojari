"use client";

import { cn } from "@/lib/utils";

const COLOR_MAP: Record<string, string> = {
  Tan: "#D4A574",
  Brown: "#7A5632",
  Maroon: "#8B1538",
  Gold: "#C4942A",
  Black: "#1A1209",
  Cream: "#F5EFE6",
  Olive: "#6B7B3A",
  Navy: "#1B2A4A",
};

interface ColorSelectorProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

export default function ColorSelector({ colors, selected, onSelect }: ColorSelectorProps) {
  return (
    <div>
      <label className="block text-xs tracking-wider uppercase text-leather-500 mb-3 font-sans">
        Select Color
      </label>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 border text-sm font-sans transition-all",
              selected === color
                ? "border-maroon-500 bg-maroon-50 dark:bg-maroon-900/20"
                : "border-sand-200 dark:border-leather-600 hover:border-gold-400"
            )}
          >
            <span
              className="w-4 h-4 rounded-full border border-sand-200"
              style={{ backgroundColor: COLOR_MAP[color] || color }}
            />
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}
