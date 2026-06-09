"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { OrderInquiry } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      toast.success("Status updated");
      fetchOrders();
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
      <h1 className="font-display text-3xl text-leather-800 mb-8">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-sm shadow-luxury">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-sans font-medium">{order.customerName}</h3>
                <p className="text-sm text-leather-400">{order.phone}</p>
                <p className="text-sm text-leather-400 mt-1">{order.address}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl text-maroon-500">
                  {formatPrice(order.total)}
                </p>
                <p className="text-xs text-leather-400">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>

            <div className="border-t border-sand-100 pt-4 mb-4">
              {order.products.map((p, i) => (
                <p key={i} className="text-sm text-leather-600">
                  {p.title} ({p.sku}) x{p.quantity} — Size {p.size}
                </p>
              ))}
              {order.notes && (
                <p className="text-sm text-leather-400 mt-2 italic">Note: {order.notes}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-leather-500">Status:</label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="input-field w-auto py-1.5 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-center py-12 text-leather-400">No orders yet</p>
        )}
      </div>
    </div>
  );
}
