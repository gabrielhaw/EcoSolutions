"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Silent looping background video over its poster photo.
 * - iOS Safari only autoplays when `muted` is in the HTML, which React doesn't
 *   reliably render, so we set it ourselves and nudge playback.
 * - The video stays invisible until it is actually playing, and is removed
 *   from view if the browser refuses to play it (e.g. iPhone Low Power Mode)
 *   or the visitor prefers reduced motion, so they see the still photo, never
 *   a play button.
 */
export default function BackgroundVideo({ poster, mobile, desktop, className = "" }: { poster: string; mobile: string; desktop: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // The pre-hydration mark (app/layout.tsx) only bridges the gap until this runs; drop it so it can't carry
    // over to the next page's video.
    const unmark = () => document.documentElement.removeAttribute("data-bg-playing");
    const show = () => {
      v.classList.replace("opacity-0", "opacity-100");
      unmark();
    };
    // Where playback is refused (Low Power Mode, in-app browsers, data saver)
    // take the element out entirely, so no browser can draw its play button.
    const hide = () => {
      v.pause();
      v.hidden = true;
    };
    // Autoplay can start before React hydrates (so a React onPlaying handler
    // would miss it); listen natively and check the current state too.
    v.addEventListener("playing", show);
    v.muted = true;
    v.setAttribute("muted", "");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) hide();
    else {
      if (!v.paused && v.readyState > 2) show();
      // AbortError just means a load interrupted play(); autoplay carries on.
      v.play().then(show, (e: DOMException) => e.name !== "AbortError" && hide());
    }
    return () => {
      v.removeEventListener("playing", show);
      unmark();
    };
  }, []);

  return (
    <>
      <Image src={poster} alt="" fill priority sizes="100vw" className={`${className} object-cover`} />
      <video
        ref={ref}
        className={`bg-video ${className} transition-opacity duration-700 opacity-0`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        disablePictureInPicture
      >
        {/* MP4 for Safari/iOS; WebM for browsers without H.264 (e.g. VS Code's preview, some Linux builds). */}
        <source src={mobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={desktop} type="video/mp4" />
        <source src={mobile.replace(/\.mp4$/, ".webm")} type="video/webm" media="(max-width: 767px)" />
        <source src={desktop.replace(/\.mp4$/, ".webm")} type="video/webm" />
      </video>
    </>
  );
}
