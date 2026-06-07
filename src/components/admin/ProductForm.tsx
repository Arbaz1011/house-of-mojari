"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { PRODUCT_CATEGORIES, PRODUCT_SIZES, PRODUCT_COLORS } from "@/types";
import type { Product } from "@/types";

interface ProductFormProps {
  initial?: Partial<Product>;
  onSuccess: () => void;
}

export default function ProductForm({ initial, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    price: initial?.price?.toString() || "",
    category: initial?.category || PRODUCT_CATEGORIES[0],
    sku: initial?.sku || "",
    stock: initial?.stock?.toString() || "10",
    featured: initial?.featured || false,
    customizable: initial?.customizable || false,
    sizes: initial?.sizes || [...PRODUCT_SIZES],
    colors: initial?.colors || ["Tan", "Brown", "Maroon"],
    images: initial?.images || [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          setForm((prev) => ({ ...prev, images: [...prev.images, data.url] }));
        }
      }
      toast.success("Images uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      const url = initial?._id
        ? `/api/products/${initial._id}`
        : "/api/products";
      const method = initial?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success(initial?._id ? "Product updated" : "Product created");
      onSuccess();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Input name="title" label="Title" value={form.title} onChange={handleChange} required />
      <Textarea name="description" label="Description" value={form.description} onChange={handleChange} required />
      <div className="grid grid-cols-2 gap-4">
        <Input name="price" label="Price (₹)" type="number" value={form.price} onChange={handleChange} required />
        <Input name="sku" label="SKU" value={form.sku} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-leather-600 mb-1.5">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input-field">
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Input name="stock" label="Stock" type="number" value={form.stock} onChange={handleChange} required />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="customizable" checked={form.customizable} onChange={handleChange} />
          Customizable
        </label>
      </div>

      <div>
        <label className="block text-sm text-leather-600 mb-2">Product Images</label>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="text-sm" />
        {uploading && <p className="text-xs text-gold-500 mt-1">Uploading...</p>}
        <div className="flex flex-wrap gap-2 mt-3">
          {form.images.map((img, i) => (
            <div key={img} className="relative w-20 h-20">
              <Image src={img} alt="" fill className="object-cover rounded-sm" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : initial?._id ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
