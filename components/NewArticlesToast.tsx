'use client';

interface NewArticlesToastProps {
  count: number;
  onRefresh: () => void;
  onDismiss: () => void;
}

export function NewArticlesToast({ count, onRefresh, onDismiss }: NewArticlesToastProps) {
  if (count === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg">
        <span className="text-sm font-medium">
          🆕 {count} new {count === 1 ? 'article' : 'articles'}
        </span>
        <button
          onClick={onRefresh}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
        >
          Refresh
        </button>
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
