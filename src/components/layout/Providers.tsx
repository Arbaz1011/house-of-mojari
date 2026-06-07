"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./ThemeProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      {!isAdmin && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#FAF7F2",
            color: "#3E2B19",
            border: "1px solid #EBE0D0",
            fontFamily: "var(--font-inter)",
          },
        }}
      />
    </ThemeProvider>
  );
}
