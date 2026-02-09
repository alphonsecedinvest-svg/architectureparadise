'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

interface Props {
  sections: FAQSection[];
}

export default function FAQPageClient({ sections }: Props) {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const filtered = search.trim()
    ? sections
        .map((section) => ({
          ...section,
          items: section.items.filter(
            (item) =>
              item.question.toLowerCase().includes(search.toLowerCase()) ||
              item.answer.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((section) => section.items.length > 0)
    : sections;

  return (
    <>
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-[var(--radius-button)] bg-card text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-text-secondary text-center py-8">
          No questions match your search. Try different keywords or{' '}
          <a href="/contact" className="text-accent hover:underline">
            contact us
          </a>
          .
        </p>
      )}

      {filtered.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-4">{section.title}</h2>
          <div className="divide-y divide-border border-t border-border">
            {section.items.map((item) => {
              const key = `${section.title}-${item.question}`;
              const isOpen = openIndex === key;
              return (
                <div key={key}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : key)}
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
                    <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
