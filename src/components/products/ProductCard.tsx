"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { resolveImageUrl } from "@/lib/images";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group card-luxury overflow-hidden"
    >
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={resolveImageUrl(product.images[0], product.sku.charCodeAt(0) % 6)}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-leather-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.featured && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-gold-400 text-leather-900 text-[10px] tracking-wider uppercase font-sans">
            Featured
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem({
              productId: product._id,
              title: product.title,
              slug: product.slug,
              price: product.price,
              image: product.images[0],
              sku: product.sku,
            });
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-leather-800/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            className={`w-4 h-4 ${inWishlist ? "text-maroon-500 fill-current" : "text-leather-500"}`}
            fill={inWishlist ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </Link>
      <div className="p-4">
        <p className="text-[10px] tracking-wider uppercase text-gold-500 font-sans mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-lg text-leather-800 dark:text-sand-100 group-hover:text-maroon-500 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="font-sans text-maroon-500">{formatPrice(product.price)}</span>
          <span className="text-xs text-leather-400">{product.sku}</span>
        </div>
      </div>
    </motion.div>
  );
}
