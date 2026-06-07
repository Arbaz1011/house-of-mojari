"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Product } from "@/types";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-leather-800 mb-8">Edit Product</h1>
      <ProductForm
        initial={product}
        onSuccess={() => router.push("/admin/products")}
      />
    </div>
  );
}
