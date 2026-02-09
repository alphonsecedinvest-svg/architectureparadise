import { NextRequest, NextResponse } from 'next/server';
import { createCart, addToCart } from '@/lib/shopify/client';

function validateLines(lines: unknown): lines is { merchandiseId: string; quantity: number }[] {
  if (!Array.isArray(lines)) return false;
  return lines.every(
    (line) =>
      typeof line === 'object' &&
      line !== null &&
      typeof (line as Record<string, unknown>).merchandiseId === 'string' &&
      (line as Record<string, unknown>).merchandiseId !== '' &&
      typeof (line as Record<string, unknown>).quantity === 'number' &&
      Number.isInteger((line as Record<string, unknown>).quantity) &&
      (line as { quantity: number }).quantity >= 1 &&
      (line as { quantity: number }).quantity <= 10
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lines } = body;

    if (lines !== undefined && !validateLines(lines)) {
      return NextResponse.json(
        { error: 'Invalid lines: each line must have a merchandiseId (string) and quantity (1-10).' },
        { status: 400 }
      );
    }

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
