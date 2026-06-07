"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Stats {
  totalProducts: number;
  featuredProducts: number;
  pendingOrders: number;
  totalOrders: number;
  pendingReviews: number;
  totalRevenue: number;
  recentOrders: Array<{
    _id: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
  lowStock: Array<{ title: string; sku: string; stock: number }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const cards = [
    { label: "Total Products", value: stats?.totalProducts || 0, color: "text-maroon-500" },
    { label: "Featured", value: stats?.featuredProducts || 0, color: "text-gold-500" },
    { label: "Pending Orders", value: stats?.pendingOrders || 0, color: "text-orange-500" },
    { label: "Total Revenue", value: formatPrice(stats?.totalRevenue || 0), color: "text-green-600" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-leather-800 mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-sm shadow-luxury">
            <p className="text-sm text-leather-400 mb-1">{card.label}</p>
            <p className={`font-display text-2xl ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-sm shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-maroon-500 hover:underline">
              View all
            </Link>
          </div>
          {stats?.recentOrders?.length ? (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="flex justify-between items-center py-2 border-b border-sand-100 last:border-0">
                  <div>
                    <p className="text-sm font-sans">{order.customerName}</p>
                    <p className="text-xs text-leather-400 capitalize">{order.status}</p>
                  </div>
                  <span className="text-sm text-gold-500">{formatPrice(order.total)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-leather-400">No orders yet</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-sm shadow-luxury">
          <h2 className="font-display text-xl mb-4">Low Stock Alert</h2>
          {stats?.lowStock?.length ? (
            <div className="space-y-3">
              {stats.lowStock.map((item) => (
                <div key={item.sku} className="flex justify-between items-center py-2 border-b border-sand-100 last:border-0">
                  <div>
                    <p className="text-sm font-sans">{item.title}</p>
                    <p className="text-xs text-leather-400">{item.sku}</p>
                  </div>
                  <span className="text-sm text-red-500">{item.stock} left</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-leather-400">All products well stocked</p>
          )}
        </div>
      </div>
    </div>
  );
}
