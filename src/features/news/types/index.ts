export interface NewsItem {
  title: string;
  description: string;
  author: string;
  url: string;
  source: string;
  category?: string;
  publishedAt: string;
  thumbnail?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Source {
  id: number;
  name: string;
}
