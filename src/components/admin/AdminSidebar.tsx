"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "👞" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/banners", label: "Banners", icon: "🖼️" },
  { href: "/admin/categories", label: "Categories", icon: "📁" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-leather-900 text-sand-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-leather-700">
        <Link href="/admin" className="block">
          <span className="font-display text-lg tracking-wider text-gold-300">
            {SITE_NAME}
          </span>
          <span className="block text-xs text-sand-400 mt-1">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors",
              pathname === link.href
                ? "bg-maroon-500/20 text-gold-300"
                : "text-sand-300 hover:bg-leather-800"
            )}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-leather-700 space-y-2">
        <Link
          href="/"
          className="block px-4 py-2 text-sm text-sand-400 hover:text-gold-300 transition-colors"
        >
          ← View Store
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-sand-400 hover:text-red-400 transition-colors text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
