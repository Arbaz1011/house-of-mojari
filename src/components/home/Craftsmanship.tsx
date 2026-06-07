"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { IMAGES } from "@/lib/images";

const STEPS = [
  {
    step: "01",
    title: "Select Premium Leather",
    description: "Handpicked full-grain leather sourced from the finest tanneries, aged to perfection.",
  },
  {
    step: "02",
    title: "Artisan Handcrafting",
    description: "Master craftsmen in Jaipur shape, stitch, and embellish each pair with generations of skill.",
  },
  {
    step: "03",
    title: "Royal Embellishment",
    description: "Traditional motifs, gold thread embroidery, and mirror work inspired by palace artistry.",
  },
  {
    step: "04",
    title: "Quality Assurance",
    description: "Every Mojari undergoes rigorous inspection before reaching your doorstep.",
  },
];

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="section-padding bg-leather-900 text-sand-100 pattern-bg">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-gold-400 font-sans text-xs tracking-[0.3em] uppercase mb-3">
            Crafted by Artisans
          </p>
          <h2 className="heading-section text-sand-50 mb-4">
            The Art of Mojari Making
          </h2>
          <p className="font-body text-sand-300 max-w-2xl mx-auto text-lg">
            Behind every pair lies a story of heritage — from the sun-baked tanneries
            of Rajasthan to the skilled hands of artisans who have perfected their
            craft over generations.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <FadeIn direction="left">
            <div className="relative aspect-video overflow-hidden rounded-sm">
              <Image
                src={IMAGES.craft}
                alt="Artisan crafting Mojari"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-8">
              {STEPS.map((item, i) => (
                <div key={item.step} className="flex gap-5">
                  <span className="font-display text-3xl text-gold-400/40">{item.step}</span>
                  <div>
                    <h3 className="font-display text-xl text-sand-50 mb-2">{item.title}</h3>
                    <p className="font-body text-sand-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
