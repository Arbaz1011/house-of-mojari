"use client";

import { useCartStore } from "@/store/cartStore";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function CheckoutOrderPage() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 section-padding text-center">
        <FadeIn>
          <h1 className="heading-section text-leather-800 dark:text-sand-50 mb-4">
            Nothing to Checkout
          </h1>
          <Link href="/products">
            <Button>Browse Collections</Button>
          </Link>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 section-padding">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
        <FadeIn>
          <h1 className="heading-section text-leather-800 dark:text-sand-50 mb-8">
            Place Your Order
          </h1>
          <CheckoutForm />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="card-luxury p-6 sticky top-28">
            <h2 className="font-display text-xl mb-6 text-leather-800 dark:text-sand-100">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-sans">{item.title}</p>
                    <p className="text-xs text-leather-400">
                      {item.sku} · Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm text-gold-500">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-sand-200 dark:border-leather-700 pt-4 flex justify-between">
              <span className="font-sans text-sm tracking-wider uppercase">Total</span>
              <span className="font-display text-xl text-maroon-500">{formatPrice(total)}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
