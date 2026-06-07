"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export default function CustomizeSection() {
  return (
    <section className="section-padding bg-sand-100 dark:bg-leather-900 pattern-bg">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn direction="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={IMAGES.customize}
              alt="Custom Mojari design"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-body italic text-sand-100 text-lg">
                &ldquo;Your vision, our artisan&apos;s hands&rdquo;
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <p className="text-gold-500 font-sans text-xs tracking-[0.3em] uppercase mb-3">
            Bespoke Craftsmanship
          </p>
          <h2 className="heading-section text-leather-800 dark:text-sand-50 mb-6">
            Customize Your Mojari
          </h2>
          <p className="font-body text-lg text-leather-500 dark:text-sand-300 leading-relaxed mb-6">
            From wedding celebrations to everyday elegance — create a pair that is
            uniquely yours. Choose leather, colors, embroidery patterns, and
            embellishments crafted by master artisans in Jaipur.
          </p>
          <ul className="space-y-3 mb-8">
            {["Premium leather selection", "Custom embroidery & motifs", "Personal sizing & fitting", "Royal heritage designs"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-sans text-leather-600 dark:text-sand-300">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  {item}
                </li>
              )
            )}
          </ul>
          <Link href="/products?category=Custom+Mojari">
            <Button>Start Customizing</Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
