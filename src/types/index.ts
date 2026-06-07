export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  sku: string;
  customizable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: string;
  title: string;
  slug: string;
  sku: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderProduct {
  productId: string;
  title: string;
  sku: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface OrderInquiry {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  products: OrderProduct[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  _id: string;
  email: string;
  name: string;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  order: number;
  active: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Review {
  _id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface ProductFilters {
  category?: string;
  size?: string;
  color?: string;
  style?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  search?: string;
  sort?: string;
}

export const PRODUCT_CATEGORIES = [
  "Women's Mojari",
  "Men's Mojari",
  "Wedding Mojari",
  "Custom Mojari",
  "Royal Collection",
] as const;

export const PRODUCT_SIZES = ["4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;

export const PRODUCT_COLORS = [
  "Tan",
  "Brown",
  "Maroon",
  "Gold",
  "Black",
  "Cream",
  "Olive",
  "Navy",
] as const;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
] as const;
