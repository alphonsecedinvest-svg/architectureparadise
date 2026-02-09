'use client';

import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import SoftwareTabs from './SoftwareTabs';
import Button from '@/components/ui/Button';
import { mockProducts } from '@/lib/shopify/mock-data';

export default function BestSellers() {
  const [filter, setFilter] = useState('All');

  const filtered =
    filter === 'All'
      ? mockProducts
      : mockProducts.filter((p) => p.tags.includes(filter));

  const display = filtered.slice(0, 4);

  return (
    <section className="py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Best-Selling Templates
          </h2>
          <p className="text-text-secondary text-sm">
            Chosen by thousands of architects
          </p>
        </div>

        <SoftwareTabs onTabChange={setFilter} />

        <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3 mt-4 mb-8">
          {display.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="ghost">View All Templates →</Button>
        </div>
      </div>
    </section>
  );
}
