"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-desert-gradient dark:bg-gradient-to-br dark:from-leather-900 dark:via-leather-800 dark:to-maroon-900" />
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sand-50 dark:to-leather-900" />
      </motion.div>

      <div className="absolute top-20 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-maroon-500/10 rounded-full blur-3xl" />

      <motion.div
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-500 font-sans text-xs tracking-[0.4em] uppercase mb-4"
          >
            Handcrafted in Rajasthan
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="heading-display text-leather-800 dark:text-sand-50 mb-6"
          >
            Walk the{" "}
            <span className="text-gradient-gold italic font-body">Heritage</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-body text-lg md:text-xl text-leather-500 dark:text-sand-300 max-w-lg leading-relaxed mb-8"
          >
            Premium handcrafted Mojari for women and men — royal Rajasthani artistry
            with modern elegance. Each pair tells a story of tradition, luxury, and
            artisan mastery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products?category=Women's+Mojari">
              <Button size="lg">Women&apos;s Mojari</Button>
            </Link>
            <Link href="/products?category=Men's+Mojari">
              <Button variant="secondary" size="lg">Men&apos;s Mojari</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative mt-10 lg:mt-0"
        >
          <div className="relative aspect-square max-w-lg mx-auto">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 aspect-square w-full max-w-md mx-auto"
            >
              <Image
                src={IMAGES.hero}
                alt="Women's royal Mojari"
                width={600}
                height={600}
                className="rounded-sm shadow-luxury-lg object-cover w-full h-full"
                priority
                unoptimized
              />
            </motion.div>
            <div className="absolute -inset-4 border border-gold-400/30 rounded-sm" />
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-maroon-500/10 rounded-sm -z-10" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gold-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
