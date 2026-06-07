"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { IMAGES } from "@/lib/images";

const COLLECTIONS = [
  {
    title: "For Her",
    subtitle: "Women's Mojari",
    href: "/products?category=Women's+Mojari",
    image: IMAGES.women.wedding,
    accent: "from-maroon-500/80 to-transparent",
  },
  {
    title: "For Him",
    subtitle: "Men's Mojari",
    href: "/products?category=Men's+Mojari",
    image: IMAGES.men.leather,
    accent: "from-leather-700/80 to-transparent",
  },
];

export default function GenderCollections() {
  return (
    <section className="section-padding bg-sand-50 dark:bg-leather-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-gold-500 font-sans text-xs tracking-[0.3em] uppercase mb-3">
            Curated for Everyone
          </p>
          <h2 className="heading-section text-leather-800 dark:text-sand-50">
            Women &amp; Men&apos;s Mojari
          </h2>
          <p className="font-body text-leather-500 dark:text-sand-300 max-w-xl mx-auto mt-3">
            Handcrafted heritage footwear — elegant Mojari for women, and regal styles for men.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {COLLECTIONS.map((col, i) => (
            <FadeIn key={col.title} delay={i * 0.15}>
              <Link href={col.href} className="group block relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-sm card-luxury">
                <Image
                  src={col.image}
                  alt={col.subtitle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${col.accent} to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold-300 font-sans text-xs tracking-[0.3em] uppercase mb-2">
                    {col.subtitle}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl text-white mb-3">{col.title}</h3>
                  <motion.span
                    className="inline-flex items-center gap-2 text-sm text-sand-100 uppercase tracking-wider font-sans group-hover:text-gold-300 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    Shop Collection
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
