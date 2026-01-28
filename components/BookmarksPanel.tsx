'use client';

import type { NewsItem } from '@/types/news';
import { BookmarkButton } from './BookmarkButton';

interface BookmarksPanelProps {
  bookmarks: NewsItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function BookmarksPanel({ 
  bookmarks, 
  isOpen, 
  onClose, 
  onRemove,
  onClearAll,
}: BookmarksPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-out overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Saved Articles
            </h2>
            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
              {bookmarks.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📑</div>
              <p className="text-gray-500 dark:text-gray-400">No saved articles yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Click the bookmark icon on any article to save it
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((item) => (
                <article 
                  key={item.id}
                  className="group p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
                      >
                        {item.title}
                      </a>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <BookmarkButton
                      isBookmarked={true}
                      onToggle={() => onRemove(item.id)}
                      size="sm"
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClearAll}
              className="w-full py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Clear all saved articles
            </button>
          </div>
        )}
      </div>
    </>
  );
}
