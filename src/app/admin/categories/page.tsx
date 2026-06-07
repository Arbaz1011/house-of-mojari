"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success("Category created");
      setForm({ name: "", description: "" });
      fetchCategories();
    } else {
      toast.error("Failed to create category");
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
      <h1 className="font-display text-3xl text-leather-800 mb-8">Categories</h1>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-sm shadow-luxury mb-8 space-y-4 max-w-lg">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Button type="submit">Add Category</Button>
      </form>

      <div className="bg-white rounded-sm shadow-luxury">
        <table className="w-full text-sm">
          <thead className="bg-sand-50 border-b">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-left p-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b border-sand-100">
                <td className="p-4 font-sans">{cat.name}</td>
                <td className="p-4 text-leather-400">{cat.slug}</td>
                <td className="p-4 text-leather-500">{cat.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="text-center py-12 text-leather-400">No categories yet</p>
        )}
      </div>
    </div>
  );
}
