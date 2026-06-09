"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getTotal } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-sand-50 dark:bg-leather-900 z-[70] shadow-luxury-lg flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-sand-200 dark:border-leather-700">
              <h2 className="font-display text-xl text-maroon-500">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:text-maroon-500 transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body text-leather-400 italic mb-4">Your cart is empty</p>
                  <Link href="/products" onClick={() => setCartOpen(false)}>
                    <Button variant="secondary">Browse Collections</Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.size}`}
                    layout
                    className="flex gap-4 p-3 card-luxury"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans text-sm text-leather-800 dark:text-sand-100 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-leather-400 mt-0.5">
                        {item.sku} · Size {item.size}
                      </p>
                      <p className="text-sm text-gold-500 mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 border border-sand-200 dark:border-leather-600 flex items-center justify-center text-sm hover:border-gold-400"
                        >
                          −
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 border border-sand-200 dark:border-leather-600 flex items-center justify-center text-sm hover:border-gold-400"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="ml-auto text-xs text-leather-400 hover:text-maroon-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-sand-200 dark:border-leather-700 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm tracking-wider uppercase">Total</span>
                  <span className="font-display text-xl text-maroon-500">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
