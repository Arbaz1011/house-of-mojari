import type { CartItem } from "@/types";

interface OrderDetails {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: CartItem[];
  total: number;
}

export function generateWhatsAppMessage(order: OrderDetails): string {
  const lines = [
    "Hello House of Mojari, I want to order:",
    "",
    ...order.items.map(
      (item) =>
        `${item.title} (${item.sku}) x${item.quantity} — Size ${item.size}, ${item.color}`
    ),
    "",
    `Total: ₹${order.total.toLocaleString("en-IN")}`,
    "",
    `Name: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
  ];

  if (order.notes) {
    lines.push(`Notes: ${order.notes}`);
  }

  lines.push("", "We will confirm payment and delivery on WhatsApp.");

  return lines.join("\n");
}

export function getWhatsAppUrl(message: string): string {
  const number = process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) {
    throw new Error("WhatsApp number not configured");
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function getWhatsAppUrlClient(message: string): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.WHATSAPP_NUMBER ||
    "917387455642";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function generateProductWhatsAppMessage(
  title: string,
  sku: string,
  size: string,
  color: string,
  price: number
): string {
  return encodeURIComponent(
    `Hello House of Mojari, I'm interested in:\n\n${title} (${sku})\nSize: ${size}\nColor: ${color}\nPrice: ₹${price.toLocaleString("en-IN")}\n\nPlease share availability and delivery details.`
  );
}
