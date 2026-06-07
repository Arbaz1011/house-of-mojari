/** Local product & homepage images */
export const IMAGES = {
  hero: "/images/hero-women.png",
  customize: "/images/customize.png",
  craft: "/images/craft.png",
  placeholder: "/images/women-royal.png",
  women: {
    royal: "/images/women-royal.png",
    wedding: "/images/women-wedding.png",
    casual: "/images/women-casual.png",
  },
  men: {
    leather: "/images/men-leather.png",
    wedding: "/images/men-wedding.png",
  },
  products: [
    "/images/women-royal.png",
    "/images/women-wedding.png",
    "/images/women-casual.png",
    "/images/men-leather.png",
    "/images/men-wedding.png",
    "/images/customize.png",
    "/images/women-royal.png",
    "/images/men-leather.png",
  ],
  gallery: [
    "/images/women-wedding.png",
    "/images/women-royal.png",
    "/images/women-casual.png",
    "/images/men-wedding.png",
    "/images/men-leather.png",
    "/images/customize.png",
  ],
} as const;

export function getProductImage(index = 0): string {
  return IMAGES.products[index % IMAGES.products.length];
}

export function resolveImageUrl(url: string | undefined, fallbackIndex = 0): string {
  if (!url) return getProductImage(fallbackIndex);
  if (url.startsWith("/images/")) return url;
  if (url.includes("unsplash.com") || url.endsWith(".svg")) {
    return getProductImage(fallbackIndex);
  }
  return url;
}
