"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import ProductGallery from "@/components/products/ProductGallery";
import SizeSelector from "@/components/products/SizeSelector";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import FadeIn from "@/components/ui/FadeIn";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { generateProductWhatsAppMessage } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Product } from "@/types";
import ReviewSection from "@/components/products/ReviewSection";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        if (data.sizes?.length) setSize(data.sizes[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="font-body text-leather-400 italic text-lg">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    addItem({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      image: product.images[0],
      quantity,
      size,
      color: "",
    });
    toast.success("Added to cart");
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateProductWhatsAppMessage(
    product.title,
    product.sku,
    size,
    product.price
  )}`;

  return (
    <div className="pt-28 pb-16 section-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <FadeIn direction="left">
          <ProductGallery images={product.images} title={product.title} />
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div>
            <p className="text-gold-500 font-sans text-xs tracking-[0.3em] uppercase mb-2">
              {product.category}
            </p>
            <h1 className="heading-section text-leather-800 dark:text-sand-50 mb-2">
              {product.title}
            </h1>
            <p className="text-sm text-leather-400 mb-4">SKU: {product.sku}</p>
            <p className="font-display text-3xl text-maroon-500 mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="font-body text-leather-600 dark:text-sand-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <SizeSelector sizes={product.sizes} selected={size} onSelect={setSize} />
              </div>
            )}

            {product.customizable && (
              <div className="mb-6 p-4 bg-gold-50 dark:bg-gold-900/10 border border-gold-200 dark:border-gold-800 rounded-sm">
                <p className="text-sm font-sans text-gold-700 dark:text-gold-300">
                  This product supports customization. Contact us on WhatsApp for bespoke options.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 mb-8">
              <label className="text-xs tracking-wider uppercase text-leather-500 font-sans">
                Qty
              </label>
              <div className="flex items-center border border-sand-200 dark:border-leather-600">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 hover:bg-sand-100 dark:hover:bg-leather-700"
                >
                  −
                </button>
                <span className="w-10 text-center font-sans">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 hover:bg-sand-100 dark:hover:bg-leather-700"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-leather-400 ml-2">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={handleAddToCart} disabled={product.stock === 0}>
                Add to Cart
              </Button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp">Order on WhatsApp</Button>
              </a>
              <Button
                variant="ghost"
                onClick={() =>
                  toggleItem({
                    productId: product._id,
                    title: product.title,
                    slug: product.slug,
                    price: product.price,
                    image: product.images[0],
                    sku: product.sku,
                  })
                }
              >
                {isInWishlist(product._id) ? "♥ Saved" : "♡ Wishlist"}
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewSection productId={product._id} />
      </div>
    </div>
  );
}
