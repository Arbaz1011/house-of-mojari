"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES, resolveImageUrl } from "@/lib/images";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const displayImages =
    images.length > 0
      ? images.map((img, i) => resolveImageUrl(img, i))
      : [IMAGES.placeholder];

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square overflow-hidden rounded-sm cursor-zoom-in bg-sand-100 dark:bg-leather-800"
        onClick={() => setZoomed(true)}
      >
        <Image
          src={displayImages[selected]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          unoptimized
        />
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {displayImages.map((img, i) => (
            <button
              key={img}
              onClick={() => setSelected(i)}
              className={`relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${
                selected === i ? "border-gold-400" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full aspect-square"
            >
              <Image
                src={displayImages[selected]}
                alt={title}
                fill
                className="object-contain"
              />
            </motion.div>
            <button
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setZoomed(false)}
              aria-label="Close zoom"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
