"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function CheckoutPage() {
  const { items, getTotal, removeItem, updateQuantity } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 section-padding text-center">
        <FadeIn>
          <h1 className="heading-section text-leather-800 dark:text-sand-50 mb-4">
            Your Cart is Empty
          </h1>
          <p className="font-body text-leather-400 italic mb-8">
            Add some handcrafted Mojari to get started.
          </p>
          <Link href="/products">
            <Button>Browse Collections</Button>
          </Link>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1 className="heading-section text-leather-800 dark:text-sand-50 mb-8 text-center">
            Checkout
          </h1>
        </FadeIn>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-4 p-4 card-luxury"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-sans text-sm">{item.title}</h3>
                <p className="text-xs text-leather-400">
                  {item.sku} · Size {item.size}
                </p>
                <p className="text-sm text-gold-500 mt-1">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity - 1)
                  }
                  className="w-8 h-8 border border-sand-200 flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity + 1)
                  }
                  className="w-8 h-8 border border-sand-200 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.productId, item.size)}
                className="text-leather-400 hover:text-maroon-500 self-start"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="card-luxury p-8">
          <div className="flex justify-between mb-6">
            <span className="font-sans tracking-wider uppercase text-sm">Total</span>
            <span className="font-display text-2xl text-maroon-500">{formatPrice(total)}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full" size="lg">Continue to Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
