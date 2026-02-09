'use client';

import { useState, useEffect, useCallback } from 'react';
import { mockTestimonials } from '@/lib/shopify/mock-data';

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const testimonials = mockTestimonials;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
          What Architects Say
        </h2>

        <div
          className="relative overflow-hidden"
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-full flex-shrink-0 px-2">
                <div className="bg-card rounded-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-w-lg mx-auto">
                  <div className="text-star text-lg mb-3">
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  <blockquote className="text-text-primary text-base leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="text-text-primary text-sm font-semibold">{t.author}</p>
                      <p className="text-text-secondary text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? 'bg-primary' : 'bg-border'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
