'use client';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
}

export function BookmarkButton({ isBookmarked, onToggle, size = 'md' }: BookmarkButtonProps) {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={`
        p-1.5 rounded-lg transition-all duration-200
        ${isBookmarked 
          ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' 
          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
        }
      `}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={isBookmarked ? 'Remove from saved' : 'Save for later'}
    >
      <svg 
        className={`${sizeClasses} transition-transform ${isBookmarked ? 'scale-110' : ''}`}
        fill={isBookmarked ? 'currentColor' : 'none'}
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    </button>
  );
}
