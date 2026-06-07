"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted");
      fetchProducts();
    } else {
      toast.error("Delete failed");
    }
  };

  const toggleFeatured = async (product: Product) => {
    const res = await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !product.featured }),
    });
    if (res.ok) {
      toast.success("Updated");
      fetchProducts();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-leather-800">Products</h1>
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="bg-white rounded-sm shadow-luxury overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand-50 border-b">
            <tr>
              <th className="text-left p-4 font-sans">Product</th>
              <th className="text-left p-4 font-sans">SKU</th>
              <th className="text-left p-4 font-sans">Category</th>
              <th className="text-left p-4 font-sans">Price</th>
              <th className="text-left p-4 font-sans">Stock</th>
              <th className="text-left p-4 font-sans">Featured</th>
              <th className="text-right p-4 font-sans">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-sand-100 hover:bg-sand-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded-sm"
                      />
                    )}
                    <span className="font-sans">{product.title}</span>
                  </div>
                </td>
                <td className="p-4 text-leather-400">{product.sku}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{formatPrice(product.price)}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <button
                    onClick={() => toggleFeatured(product)}
                    className={`px-2 py-1 text-xs rounded ${product.featured ? "bg-gold-100 text-gold-700" : "bg-sand-100 text-leather-400"}`}
                  >
                    {product.featured ? "Yes" : "No"}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link href={`/admin/products/${product._id}`} className="text-maroon-500 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center py-12 text-leather-400">No products yet</p>
        )}
      </div>
    </div>
  );
}
