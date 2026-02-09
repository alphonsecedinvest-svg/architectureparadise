'use client';

import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import SoftwareTabs from './SoftwareTabs';
import Button from '@/components/ui/Button';
import type { ShopifyProduct } from '@/types';

// Software tag mapping to match real Shopify tags
const TAG_MAP: Record<string, string> = {
  'All': '',
  'AutoCAD': 'Software_AutoCAD',
  'ArchiCAD': 'Software_Archicad',
  'Revit': 'Software_Revit',
  'Illustrator': 'Software_illustrator',
  'Photoshop': 'Software_Photoshop',
};

interface BestSellersProps {
  products: ShopifyProduct[];
}

export default function BestSellers({ products }: BestSellersProps) {
  const [filter, setFilter] = useState('All');

  const filtered =
    filter === 'All'
      ? products
      : products.filter((p) => {
          const tag = TAG_MAP[filter] || filter;
          return p.tags.some(t => t.toLowerCase() === tag.toLowerCase());
        });

  const display = filtered.slice(0, 8);

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
