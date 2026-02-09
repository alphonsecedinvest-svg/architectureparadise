import type { ShopifyProduct } from '@/types';
import ProductCard from '@/components/ui/ProductCard';

interface RelatedProductsProps {
  products: ShopifyProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="py-6">
      <h3 className="font-bold text-lg px-4 mb-4">Complete Your Collection</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
        {products.map(product => (
          <div key={product.id} className="w-[200px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
