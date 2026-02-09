import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductsByTag } from '@/lib/shopify/client';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tag = searchParams.get('tag');
  const first = parseInt(searchParams.get('first') || '20');
  const sort = searchParams.get('sort') || 'BEST_SELLING';

  try {
    const products = tag
      ? await getProductsByTag(tag, first)
      : await getProducts(first, sort);
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
