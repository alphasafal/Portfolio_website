"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  video: string;
  poster: string;
  alt: string;
  className?: string;
  aspect?: "video" | "square" | "wide";
  priority?: boolean;
  active?: boolean;
};

export function DemoFrame({
  video,
  poster,
  alt,
  className,
  aspect = "video",
  priority = false,
  active = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePoster, setUsePoster] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onCanPlay = () => setUsePoster(false);
    const onError = () => setUsePoster(true);

    el.addEventListener("canplay", onCanPlay);
    el.addEventListener("error", onError);

    if (active) {
      el.play().catch(() => setUsePoster(true));
    } else {
      el.pause();
    }

    return () => {
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("error", onError);
    };
  }, [active, video]);

  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[21/9]" : "aspect-video";

  return (
    <div
      className={cn(
        "demo-frame relative overflow-hidden rounded-2xl bg-[#0e0e12]",
        aspectClass,
        className
      )}
    >
      <div
        className="demo-frame-glow pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
      {usePoster && (
        <Image
          src={poster}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority={priority}
        />
      )}
      <video
        ref={videoRef}
        src={video}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          usePoster && "opacity-0"
        )}
        aria-label={alt}
      />
    </div>
  );
}
