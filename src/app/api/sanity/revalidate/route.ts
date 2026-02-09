import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const type = body?._type as string | undefined;

    if (type === 'homepage') {
      revalidateTag('homepage', 'max');
    } else if (type === 'blogPost') {
      revalidateTag('blog', 'max');
    } else if (type === 'siteSettings') {
      revalidateTag('settings', 'max');
    } else {
      revalidateTag('homepage', 'max');
      revalidateTag('blog', 'max');
      revalidateTag('settings', 'max');
    }

    return NextResponse.json({ revalidated: true, type });
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
