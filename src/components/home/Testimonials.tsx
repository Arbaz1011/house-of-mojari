"use client";

import FadeIn from "@/components/ui/FadeIn";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-sand-50 dark:bg-leather-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="text-gold-500 font-sans text-xs tracking-[0.3em] uppercase mb-3">
            Customer Love
          </p>
          <h2 className="heading-section text-leather-800 dark:text-sand-50">
            What Our Customers Say
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="card-luxury p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-leather-600 dark:text-sand-300 leading-relaxed flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-sand-200 dark:border-leather-700">
                  <p className="font-sans text-sm text-leather-800 dark:text-sand-100">{t.name}</p>
                  <p className="text-xs text-leather-400">{t.location}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
