'use client';

import { useState } from 'react';
import type { FAQItem } from '@/types';

interface ProductFAQProps {
  items: FAQItem[];
}

export default function ProductFAQ({ items }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="px-4 py-6">
      <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
      <div className="divide-y divide-border">
        {items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex items-center justify-between w-full py-4 text-left text-sm font-medium text-text-primary"
            >
              <span>{item.question}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 ml-2 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'max-h-40 pb-4' : 'max-h-0'
              }`}
            >
              <p className="text-sm text-text-secondary leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
