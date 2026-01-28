'use client';

import type { NewsItem } from '@/types/news';

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {item.isHot && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                🔥 Hot
              </span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.source}
            </span>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="after:absolute after:inset-0"
            >
              {item.title}
            </a>
          </h2>
          
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="inline-flex items-center text-blue-600 dark:text-blue-400">
              Read more →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
