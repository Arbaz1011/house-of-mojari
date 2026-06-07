import Link from "next/link";
import { INSTAGRAM_HANDLE, SITE_NAME, SITE_TAGLINE, whatsAppUrl, WHATSAPP_DISPLAY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-leather-900 text-sand-200 pattern-bg">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl tracking-[0.15em] text-gold-300 mb-2">
              {SITE_NAME}
            </h3>
            <p className="text-sm text-sand-300/80 font-body italic mb-4">
              {SITE_TAGLINE}
            </p>
            <p className="text-sm text-sand-400 leading-relaxed">
              Handcrafted Mojari for women and men — inspired by the royal heritage of Rajasthan.
              Tradition in every step.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li><Link href="/products?category=Women's+Mojari" className="hover:text-gold-300 transition-colors">Women&apos;s Mojari</Link></li>
              <li><Link href="/products?category=Men's+Mojari" className="hover:text-gold-300 transition-colors">Men&apos;s Mojari</Link></li>
              <li><Link href="/products?category=Wedding+Mojari" className="hover:text-gold-300 transition-colors">Wedding Mojari</Link></li>
              <li><Link href="/products?category=Custom+Mojari" className="hover:text-gold-300 transition-colors">Custom Mojari</Link></li>
              <li><Link href="/products?category=Royal+Collection" className="hover:text-gold-300 transition-colors">Royal Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li><Link href="/#craftsmanship" className="hover:text-gold-300 transition-colors">Our Craft</Link></li>
              <li><Link href="/#testimonials" className="hover:text-gold-300 transition-colors">Reviews</Link></li>
              <li><Link href="/wishlist" className="hover:text-gold-300 transition-colors">Wishlist</Link></li>
              <li><Link href="/checkout" className="hover:text-gold-300 transition-colors">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <a
                  href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors"
                >
                  @{INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={whatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="text-sand-400">Jaipur, Rajasthan, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-leather-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-sand-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-sand-500 font-body italic">
            Walk the Heritage
          </p>
        </div>
      </div>
    </footer>
  );
}
