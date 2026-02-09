'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { ShopifyProduct } from '@/types';
import { track } from '@/lib/utils/analytics';
import ProductCard from '@/components/ui/ProductCard';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';

type SortOption = 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

const sortLabels: Record<SortOption, string> = {
  popular: 'Popular',
  newest: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  rating: 'Best Rated',
};

interface Filters {
  categories: string[];
  priceMax: number;
  styles: string[];
}

interface CollectionGridProps {
  products: ShopifyProduct[];
  pageSize?: number;
}

export default function CollectionGrid({ products, pageSize = 12 }: CollectionGridProps) {
  const [sort, setSort] = useState<SortOption>('popular');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ categories: [], priceMax: 200, styles: [] });
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track view_item_list on mount
  useEffect(() => {
    track('view_item_list', {
      item_list_name: 'collection',
      items: products.slice(0, 12).map(p => ({
        item_id: p.id,
        item_name: p.title,
        price: parseFloat(p.priceRange.minVariantPrice.amount),
        item_category: p.productType,
      })),
    });
  }, [products]);

  // Extract available categories
  const allCategories = useMemo(() => [...new Set(products.map(p => p.productType))], [products]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.productType));
    }
    if (filters.priceMax < 200) {
      result = result.filter(p => parseFloat(p.priceRange.minVariantPrice.amount) <= filters.priceMax);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
        break;
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
        break;
      case 'rating': {
        const getRating = (p: ShopifyProduct) => {
          const t = p.tags.find(t => t.startsWith('rating:'));
          return t ? parseFloat(t.split(':')[1]) : 0;
        };
        result.sort((a, b) => getRating(b) - getRating(a));
        break;
      }
      case 'newest':
        result.reverse();
        break;
      // popular = default order
    }

    return result;
  }, [products, filters, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + pageSize);
            setLoading(false);
          }, 300);
        }
      },
      { rootMargin: '0px 0px 20% 0px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, pageSize]);

  const activeFilterCount = filters.categories.length + (filters.priceMax < 200 ? 1 : 0) + filters.styles.length;

  const toggleCategory = useCallback((cat: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat],
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ categories: [], priceMax: 200, styles: [] });
  }, []);

  return (
    <>
      {/* Filter/Sort bar */}
      <div className="sticky top-14 z-30 bg-white border-b border-border">
        <div className="flex items-center gap-3 px-4 h-12">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-text-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="ml-auto relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 text-sm text-text-secondary"
            >
              Sort: {sortLabels[sort]}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-border z-20 min-w-[200px] py-1">
                  {(Object.keys(sortLabels) as SortOption[]).map(key => (
                    <button
                      key={key}
                      onClick={() => { setSort(key); setSortOpen(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-sm ${sort === key ? 'text-accent font-medium' : 'text-text-primary'} hover:bg-surface`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-semibold text-text-primary mb-2">No templates match your filters</p>
          <p className="text-sm text-text-muted mb-4">Try adjusting your filters to find what you need.</p>
          <Button variant="secondary" onClick={clearFilters}>Clear All Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3 px-4 py-4">
          {visible.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {hasMore && <div ref={sentinelRef} className="h-1" />}
      {loading && <SkeletonGrid count={4} />}

      {/* Results count */}
      <p className="text-center text-xs text-text-muted py-4">
        Showing {visible.length} of {filtered.length} templates
      </p>

      {/* Filter Bottom Sheet */}
      <BottomSheet open={filterOpen} onClose={() => setFilterOpen(false)} title="Filters">
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={clearFilters} className="text-sm text-accent font-medium">Clear all</button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide text-text-secondary">Category</h4>
            <div className="space-y-2">
              {allCategories.map(cat => (
                <label key={cat} className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-5 h-5 rounded border-border accent-accent"
                  />
                  <span>{cat}</span>
                  <span className="text-text-muted ml-auto">
                    ({products.filter(p => p.productType === cat).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide text-text-secondary">Price Range</h4>
            <input
              type="range"
              min={0}
              max={200}
              value={filters.priceMax}
              onChange={e => setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>€0</span>
              <span>€{filters.priceMax}{filters.priceMax >= 200 ? '+' : ''}</span>
            </div>
          </div>

          <Button fullWidth onClick={() => setFilterOpen(false)}>
            Show {filtered.length} Results
          </Button>
        </div>
      </BottomSheet>
    </>
  );
}
