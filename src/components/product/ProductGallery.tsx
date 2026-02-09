'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import type { ShopifyImage } from '@/types';

interface ProductGalleryProps {
  images: ShopifyImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrent(index);
      containerRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < images.length - 1) goTo(current + 1);
      if (diff < 0 && current > 0) goTo(current - 1);
    }
  };

  // Sync scroll position with current index via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = children.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setCurrent(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    children.forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <div className="relative">
      {/* Images container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => (
          <div key={i} className="w-full flex-shrink-0 snap-start">
            <div className="relative aspect-[4/3] bg-surface-alt">
              <Image
                src={img.url}
                alt={img.altText || `Product image ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Counter */}
      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
        {current + 1}/{images.length}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 py-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-primary w-4' : 'bg-border'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
