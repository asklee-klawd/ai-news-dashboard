export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  date: string;
  isHot?: boolean;
  score?: number;
}

export interface NewsResponse {
  items: NewsItem[];
  sources: {
    name: string;
    count: number;
    status: 'ok' | 'error';
  }[];
  fetchedAt: string;
}
