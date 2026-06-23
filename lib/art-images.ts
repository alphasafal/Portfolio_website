/** Portfolio image assets */
export const ART = {
  /** High-res PNG cutout — sharper than safal-portrait.jpg (400×400) */
  portrait: "/safal-hero-nobg.png",
  hero: "/safal-hero-nobg.png",
} as const;

export const IMAGE_QUALITY = 100;
export const HERO_IMAGE_SIZES = "(max-width: 768px) 90vw, 560px";
export const PORTRAIT_SIZES = "(max-width: 768px) 288px, 384px";
export const PORTRAIT_DIMENSIONS = { width: 472, height: 528 } as const;
