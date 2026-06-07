"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-6 h-6", md: "w-10 h-10", lg: "w-16 h-16" };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} border-2 border-gold-200 border-t-gold-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
