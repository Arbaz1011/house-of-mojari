"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="font-display text-3xl text-leather-800 mb-8">Add Product</h1>
      <ProductForm onSuccess={() => router.push("/admin/products")} />
    </div>
  );
}
