"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { generateWhatsAppMessage, getWhatsAppUrlClient } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const total = getTotal();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerName || !form.phone || !form.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        ...form,
        products: items.map((item) => ({
          productId: item.productId,
          title: item.title,
          sku: item.sku,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        })),
        total,
      };

      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const message = generateWhatsAppMessage({
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        notes: form.notes,
        items,
        total,
      });

      const whatsappUrl = getWhatsAppUrlClient(message);
      clearCart();
      window.open(whatsappUrl, "_blank");
      toast.success("Order placed! Opening WhatsApp...");
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="customerName"
        name="customerName"
        label="Full Name *"
        value={form.customerName}
        onChange={handleChange}
        required
        placeholder="Rahul Sharma"
      />
      <Input
        id="phone"
        name="phone"
        label="Phone Number *"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        required
        placeholder="+91 98765 43210"
      />
      <Textarea
        id="address"
        name="address"
        label="Delivery Address *"
        value={form.address}
        onChange={handleChange}
        required
        placeholder="House no, Street, City, State, PIN"
      />
      <Textarea
        id="notes"
        name="notes"
        label="Order Notes (Optional)"
        value={form.notes}
        onChange={handleChange}
        placeholder="Any special instructions..."
      />

      <div className="p-4 bg-sand-100 dark:bg-leather-800 border border-sand-200 dark:border-leather-600 rounded-sm">
        <p className="text-sm font-sans text-leather-600 dark:text-sand-300">
          We will confirm payment and delivery on WhatsApp.
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-sand-200 dark:border-leather-700">
        <span className="font-sans text-sm tracking-wider uppercase">Order Total</span>
        <span className="font-display text-2xl text-maroon-500">{formatPrice(total)}</span>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Processing..." : "Place Order via WhatsApp"}
      </Button>
    </form>
  );
}
