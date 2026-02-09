'use client';

import { useState } from 'react';
import { mockFAQ } from '@/lib/shopify/mock-data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 px-4">
      <div className="max-w-[700px] mx-auto">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-border">
          {mockFAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left gap-4"
                >
                  <span className="text-text-primary font-medium text-base">
                    {item.question}
                  </span>
                  <span
                    className={`text-text-muted text-xl flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
