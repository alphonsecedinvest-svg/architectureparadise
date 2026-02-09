import { NextRequest, NextResponse } from 'next/server';
import { createCart, addToCart } from '@/lib/shopify/client';

export async function POST(request: NextRequest) {
  try {
    const { lines } = await request.json();

    // Create cart and add lines
    const cart = await createCart();
    if (lines && lines.length > 0) {
      const updatedCart = await addToCart(cart.id, lines);
      return NextResponse.json({
        cartId: updatedCart.id,
        checkoutUrl: updatedCart.checkoutUrl,
      });
    }

    return NextResponse.json({
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
    });
  } catch (err) {
    console.error('Cart API error:', err);
    return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 });
  }
}
