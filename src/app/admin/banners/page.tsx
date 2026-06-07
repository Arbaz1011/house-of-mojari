"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Banner } from "@/types";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", subtitle: "", image: "", link: "" });

  const fetchBanners = () => {
    fetch("/api/banners")
      .then((r) => r.json())
      .then((data) => {
        setBanners(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setForm((prev) => ({ ...prev, image: data.url }));
      toast.success("Image uploaded");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, order: banners.length, active: true }),
    });
    if (res.ok) {
      toast.success("Banner created");
      setForm({ title: "", subtitle: "", image: "", link: "" });
      fetchBanners();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete banner?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    fetchBanners();
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
      <h1 className="font-display text-3xl text-leather-800 mb-8">Homepage Banners</h1>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-sm shadow-luxury mb-8 space-y-4 max-w-lg">
        <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <Input label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        <Input label="Link URL" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        <div>
          <label className="block text-sm mb-1.5">Banner Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {form.image && (
            <Image src={form.image} alt="" width={200} height={100} className="mt-2 object-cover rounded-sm" />
          )}
        </div>
        <Button type="submit">Add Banner</Button>
      </form>

      <div className="grid sm:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div key={banner._id} className="bg-white rounded-sm shadow-luxury overflow-hidden">
            <div className="relative h-40">
              <Image src={banner.image} alt={banner.title} fill className="object-cover" />
            </div>
            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-sans font-medium">{banner.title}</h3>
                {banner.subtitle && <p className="text-sm text-leather-400">{banner.subtitle}</p>}
              </div>
              <button onClick={() => handleDelete(banner._id)} className="text-red-500 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
