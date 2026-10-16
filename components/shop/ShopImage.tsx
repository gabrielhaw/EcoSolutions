"use client";

import Image, { type ImageProps } from "next/image";
import { shopImg } from "@/lib/shop";

/**
 * A Shopify product photo at the width the browser actually needs: next/image
 * writes the srcset from `sizes`, and Shopify's CDN does the resizing (and
 * sends WebP to browsers that accept it). Pass the photo's plain Shopify URL.
 * `aspect` (width / height) is the shape the photo is shown in; Shopify then crops
 * to it, which saves about a quarter of the bytes for square or tall photos in
 * 4:3 cards. A client component because a loader is a function, which server
 * components can't hand to next/image.
 */
export default function ShopImage({ alt, aspect, ...props }: Omit<ImageProps, "loader" | "unoptimized"> & { src: string; aspect?: number }) {
  return <Image {...props} alt={alt} loader={({ src, width }) => shopImg(src, width, aspect ? Math.round(width / aspect) : undefined)} />;
}
