export const SITE_NAME = "HOUSE OF MOJARI";
export const SITE_TAGLINE = "Crafted for Her & Him";
export const SITE_DESCRIPTION =
  "Premium handcrafted Mojari for women and men — Rajasthani royal heritage in every step.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products?category=Women's+Mojari", label: "Women" },
  { href: "/products?category=Men's+Mojari", label: "Men" },
  { href: "/products", label: "Collections" },
  { href: "/products?category=Custom+Mojari", label: "Customize" },
];

export const INSTAGRAM_HANDLE = "houseofmojari";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917387455642";
export const WHATSAPP_DISPLAY = "+91 7387455642";

export function whatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Jaipur",
    text: "The women's Royal Mojari are absolutely stunning — perfect for my wedding. Every stitch feels like heritage.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    text: "Ordered groom Mojari for my wedding. The team was incredibly responsive on WhatsApp and the fit was perfect.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    text: "Finally found Mojari that blend traditional elegance with comfort. House of Mojari is my go-to for every occasion.",
    rating: 5,
  },
];
