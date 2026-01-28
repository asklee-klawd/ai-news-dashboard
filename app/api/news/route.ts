import { NextResponse } from 'next/server';
import { aggregateNews } from '@/lib/sources';
import type { NewsResponse } from '@/types/news';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(): Promise<NextResponse<NewsResponse>> {
  try {
    const news = await aggregateNews(20);
    
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error aggregating news:', error);
    
    return NextResponse.json(
      {
        items: [],
        sources: [],
        fetchedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
