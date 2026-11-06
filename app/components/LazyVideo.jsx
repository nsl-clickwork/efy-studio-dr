'use client';

import { useEffect, useRef } from 'react';

// Background video that loads only when it comes near the viewport.
// Same look as <video autoPlay loop muted playsInline>, but no download before scrolling.
export default function LazyVideo({ src, className, style, poster }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = () => {
      if (!el.src) el.src = src;
      el.play().catch(() => {});
    };
    if (!('IntersectionObserver' in window)) { start(); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else if (el.src) el.pause();
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}
