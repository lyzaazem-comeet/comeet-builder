// Shared font utilities for all block components
// Uses CSS variables set by next/font/google in layout.tsx

export const fontFamilyMap: Record<string, string> = {
  classic: "var(--font-playfair), serif",
  elegant: "var(--font-montserrat), sans-serif",
  modern: "var(--font-inter), sans-serif",
  playful: "var(--font-poppins), sans-serif",
}

export function getFontFamily(key?: string): string {
  return fontFamilyMap[key || "modern"] || fontFamilyMap.modern
}

export function getFontSize(size?: string): string {
  // If it's a number (pixel value), use directly
  if (size && !isNaN(Number(size))) {
    return `${size}px`
  }
  // Legacy preset mapping
  const presetMap: Record<string, string> = {
    sm: "24px",
    md: "30px",
    lg: "36px",
    xl: "48px",
  }
  return presetMap[size || "md"] || "30px"
}
