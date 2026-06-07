import bcrypt from "bcryptjs";
import {
  connectDB,
  newId,
  readCollection,
  timestamps,
  writeCollection,
} from "./json-db";
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from "./seed-data";
import { slugify } from "./utils";

export interface StoredAdmin {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredProduct {
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
  createdAt: string;
  updatedAt: string;
}

export interface StoredOrder {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  products: Array<{
    productId: string;
    title: string;
    sku: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
  }>;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredBanner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoredCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredReview {
  _id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export async function findAdminByEmail(email: string) {
  await connectDB();
  const admins = await readCollection<StoredAdmin>("admins");
  return admins.find((a) => a.email === email.toLowerCase()) ?? null;
}

export async function createAdmin(data: {
  email: string;
  password: string;
  name?: string;
}) {
  await connectDB();
  const admins = await readCollection<StoredAdmin>("admins");
  const ts = timestamps();
  const admin: StoredAdmin = {
    _id: newId(),
    email: data.email.toLowerCase(),
    password: data.password,
    name: data.name || "Admin",
    ...ts,
  };
  admins.push(admin);
  await writeCollection("admins", admins);
  return admin;
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function listProducts(params: {
  category?: string;
  size?: string;
  color?: string;
  featured?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) {
  await connectDB();
  let products = await readCollection<StoredProduct>("products");

  if (params.category) {
    products = products.filter((p) => p.category === params.category);
  }
  if (params.size) {
    products = products.filter((p) => p.sizes.includes(params.size!));
  }
  if (params.color) {
    products = products.filter((p) => p.colors.includes(params.color!));
  }
  if (params.featured) {
    products = products.filter((p) => p.featured);
  }
  if (params.minPrice != null) {
    products = products.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice != null) {
    products = products.filter((p) => p.price <= params.maxPrice!);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  const sort = params.sort || "newest";
  products.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.title.localeCompare(b.title);
    return b.createdAt.localeCompare(a.createdAt);
  });

  return products;
}

export async function findProductByIdOrSlug(id: string) {
  await connectDB();
  const products = await readCollection<StoredProduct>("products");
  return (
    products.find((p) => p._id === id || p.slug === id) ?? null
  );
}

export async function createProduct(
  data: Omit<StoredProduct, "_id" | "createdAt" | "updatedAt">
) {
  await connectDB();
  const products = await readCollection<StoredProduct>("products");
  const ts = timestamps();
  const product: StoredProduct = {
    _id: newId(),
    ...data,
    slug: data.slug || slugify(data.title),
    sku: data.sku.toUpperCase(),
    ...ts,
  };
  products.push(product);
  await writeCollection("products", products);
  return product;
}

export async function updateProduct(id: string, data: Partial<StoredProduct>) {
  await connectDB();
  const products = await readCollection<StoredProduct>("products");
  const index = products.findIndex((p) => p._id === id);
  if (index === -1) return null;
  products[index] = {
    ...products[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeCollection("products", products);
  return products[index];
}

export async function deleteProduct(id: string) {
  await connectDB();
  const products = await readCollection<StoredProduct>("products");
  const filtered = products.filter((p) => p._id !== id);
  if (filtered.length === products.length) return false;
  await writeCollection("products", filtered);
  return true;
}

export async function searchProducts(q: string) {
  await connectDB();
  const products = await readCollection<StoredProduct>("products");
  const lower = q.toLowerCase();
  return products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    )
    .slice(0, 12)
    .map(({ _id, title, slug, price, images, sku, category }) => ({
      _id,
      title,
      slug,
      price,
      images,
      sku,
      category,
    }));
}

export async function countProducts(filter?: { featured?: boolean }) {
  const products = await listProducts({
    featured: filter?.featured,
  });
  return products.length;
}

export async function getLowStockProducts(limit = 5) {
  await connectDB();
  const products = await readCollection<StoredProduct>("products");
  return products
    .filter((p) => p.stock > 0 && p.stock <= 5)
    .slice(0, limit)
    .map(({ title, sku, stock }) => ({ title, sku, stock }));
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function listOrders(status?: string) {
  await connectDB();
  let orders = await readCollection<StoredOrder>("orders");
  if (status) orders = orders.filter((o) => o.status === status);
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findOrderById(id: string) {
  await connectDB();
  const orders = await readCollection<StoredOrder>("orders");
  return orders.find((o) => o._id === id) ?? null;
}

export async function createOrder(
  data: Omit<StoredOrder, "_id" | "createdAt" | "updatedAt" | "status"> & {
    status?: string;
  }
) {
  await connectDB();
  const orders = await readCollection<StoredOrder>("orders");
  const ts = timestamps();
  const order: StoredOrder = {
    _id: newId(),
    status: data.status || "pending",
    ...data,
    ...ts,
  };
  orders.push(order);
  await writeCollection("orders", orders);
  return order;
}

export async function updateOrderStatus(id: string, status: string) {
  await connectDB();
  const orders = await readCollection<StoredOrder>("orders");
  const index = orders.findIndex((o) => o._id === id);
  if (index === -1) return null;
  orders[index] = {
    ...orders[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  await writeCollection("orders", orders);
  return orders[index];
}

export async function deleteOrder(id: string) {
  await connectDB();
  const orders = await readCollection<StoredOrder>("orders");
  const filtered = orders.filter((o) => o._id !== id);
  if (filtered.length === orders.length) return false;
  await writeCollection("orders", filtered);
  return true;
}

export async function countOrders(filter?: { status?: string }) {
  const orders = await listOrders(filter?.status);
  return orders.length;
}

export async function getTotalRevenue() {
  await connectDB();
  const orders = await readCollection<StoredOrder>("orders");
  return orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
}

export async function getRecentOrders(limit = 5) {
  const orders = await listOrders();
  return orders.slice(0, limit);
}

// ─── Banners ─────────────────────────────────────────────────────────────────

export async function listBanners(activeOnly = false) {
  await connectDB();
  let banners = await readCollection<StoredBanner>("banners");
  if (activeOnly) banners = banners.filter((b) => b.active);
  return banners.sort((a, b) => a.order - b.order);
}

export async function createBanner(
  data: Omit<StoredBanner, "_id" | "createdAt" | "updatedAt">
) {
  await connectDB();
  const banners = await readCollection<StoredBanner>("banners");
  const ts = timestamps();
  const banner: StoredBanner = { _id: newId(), ...data, ...ts };
  banners.push(banner);
  await writeCollection("banners", banners);
  return banner;
}

export async function updateBanner(id: string, data: Partial<StoredBanner>) {
  await connectDB();
  const banners = await readCollection<StoredBanner>("banners");
  const index = banners.findIndex((b) => b._id === id);
  if (index === -1) return null;
  banners[index] = {
    ...banners[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeCollection("banners", banners);
  return banners[index];
}

export async function deleteBanner(id: string) {
  await connectDB();
  const banners = await readCollection<StoredBanner>("banners");
  const filtered = banners.filter((b) => b._id !== id);
  if (filtered.length === banners.length) return false;
  await writeCollection("banners", filtered);
  return true;
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function listCategories() {
  await connectDB();
  const categories = await readCollection<StoredCategory>("categories");
  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}) {
  await connectDB();
  const categories = await readCollection<StoredCategory>("categories");
  const ts = timestamps();
  const category: StoredCategory = {
    _id: newId(),
    name: data.name,
    slug: data.slug || slugify(data.name),
    description: data.description,
    image: data.image,
    ...ts,
  };
  categories.push(category);
  await writeCollection("categories", categories);
  return category;
}

export async function replaceCategories(
  items: Omit<StoredCategory, "_id" | "createdAt" | "updatedAt">[]
) {
  await connectDB();
  const ts = timestamps();
  const categories = items.map((item) => ({
    _id: newId(),
    ...item,
    ...ts,
  }));
  await writeCollection("categories", categories);
  return categories;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function listReviews(params?: {
  productId?: string;
  approvedOnly?: boolean;
}) {
  await connectDB();
  let reviews = await readCollection<StoredReview>("reviews");
  if (params?.productId) {
    reviews = reviews.filter((r) => r.productId === params.productId);
  }
  if (params?.approvedOnly) {
    reviews = reviews.filter((r) => r.approved);
  }
  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createReview(
  data: Omit<StoredReview, "_id" | "createdAt" | "updatedAt" | "approved"> & {
    approved?: boolean;
  }
) {
  await connectDB();
  const reviews = await readCollection<StoredReview>("reviews");
  const ts = timestamps();
  const review: StoredReview = {
    _id: newId(),
    approved: data.approved ?? false,
    ...data,
    ...ts,
  };
  reviews.push(review);
  await writeCollection("reviews", reviews);
  return review;
}

export async function updateReviewApproval(id: string, approved: boolean) {
  await connectDB();
  const reviews = await readCollection<StoredReview>("reviews");
  const index = reviews.findIndex((r) => r._id === id);
  if (index === -1) return null;
  reviews[index] = {
    ...reviews[index],
    approved,
    updatedAt: new Date().toISOString(),
  };
  await writeCollection("reviews", reviews);
  return reviews[index];
}

export async function countReviews(filter?: { approved?: boolean }) {
  await connectDB();
  const reviews = await readCollection<StoredReview>("reviews");
  if (filter?.approved === false) {
    return reviews.filter((r) => !r.approved).length;
  }
  return reviews.length;
}

// ─── Seed ────────────────────────────────────────────────────────────────────

export async function isDatabaseEmpty() {
  await connectDB();
  const admins = await readCollection<StoredAdmin>("admins");
  return admins.length === 0;
}

export async function seedDatabase(options?: {
  adminEmail?: string;
  adminPassword?: string;
  products?: Omit<StoredProduct, "_id" | "createdAt" | "updatedAt">[];
  categories?: Omit<StoredCategory, "_id" | "createdAt" | "updatedAt">[];
}) {
  await connectDB();

  const adminEmail = options?.adminEmail || "admin@houseofmojari.com";
  const adminPassword = options?.adminPassword || "Admin@123456";

  const existingAdmin = await findAdminByEmail(adminEmail);
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await createAdmin({ email: adminEmail, password: hashed, name: "Admin" });
  }

  if (options?.categories?.length) {
    await replaceCategories(options.categories);
  }

  if (options?.products?.length) {
    await writeCollection("products", []);
    for (const p of options.products) {
      await createProduct(p);
    }
  }

  const banners = await readCollection<StoredBanner>("banners");
  if (banners.length === 0) {
    await createBanner({
      title: "Walk the Heritage",
      subtitle: "Premium Handcrafted Mojari from Jaipur",
      image: "/images/hero-women.png",
      link: "/products?category=Women's+Mojari",
      order: 0,
      active: true,
    });
  }
}

export async function ensureInitialData() {
  if (await isDatabaseEmpty()) {
    await seedDatabase({
      adminEmail: process.env.ADMIN_EMAIL || "admin@houseofmojari.com",
      adminPassword: process.env.ADMIN_PASSWORD || "Admin@123456",
      products: SAMPLE_PRODUCTS,
      categories: SAMPLE_CATEGORIES,
    });
    return;
  }

  const products = await readCollection<StoredProduct>("products");
  if (products.length === 0) {
    await seedDatabase({
      products: SAMPLE_PRODUCTS,
      categories: SAMPLE_CATEGORIES,
    });
  }
}
