"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();

  return (
    <div className="pt-28 pb-16 section-padding">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h1 className="heading-section text-leather-800 dark:text-sand-50">
            Your Wishlist
          </h1>
        </FadeIn>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-leather-400 italic mb-6">
              No saved items yet.
            </p>
            <Link href="/products">
              <Button>Explore Collections</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <FadeIn key={item.productId} delay={i * 0.05}>
                <div className="card-luxury overflow-hidden group">
                  <Link href={`/products/${item.slug}`} className="block relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-display text-lg hover:text-maroon-500 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-maroon-500">{formatPrice(item.price)}</span>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-xs text-leather-400 hover:text-maroon-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
