import { GET } from '@/app/api/news/route';
import type { NewsItem } from '@/types/news';

describe('GET /api/news', () => {
  it('returns a list of news items', async () => {
    const response = await GET();
    const data: NewsItem[] = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('returns news items with correct structure', async () => {
    const response = await GET();
    const data: NewsItem[] = await response.json();

    const item = data[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('title');
    expect(item).toHaveProperty('url');
    expect(item).toHaveProperty('source');
    expect(item).toHaveProperty('date');
  });

  it('returns valid URLs', async () => {
    const response = await GET();
    const data: NewsItem[] = await response.json();

    data.forEach((item) => {
      expect(item.url).toMatch(/^https?:\/\//);
    });
  });

  it('returns valid dates', async () => {
    const response = await GET();
    const data: NewsItem[] = await response.json();

    data.forEach((item) => {
      const date = new Date(item.date);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });

  it('marks some items as hot', async () => {
    const response = await GET();
    const data: NewsItem[] = await response.json();

    const hotItems = data.filter((item) => item.isHot);
    expect(hotItems.length).toBeGreaterThan(0);
  });
});
