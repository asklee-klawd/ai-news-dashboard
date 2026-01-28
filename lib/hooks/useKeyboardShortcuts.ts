'use client';

import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onRefresh?: () => void;
  onToggleBookmarks?: () => void;
  onToggleDarkMode?: () => void;
  onClearSearch?: () => void;
  onFocusSearch?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      // Allow Escape in inputs
      if (event.key === 'Escape' && handlers.onClearSearch) {
        handlers.onClearSearch();
        (event.target as HTMLElement).blur();
      }
      return;
    }

    // Prevent default for our shortcuts
    const key = event.key.toLowerCase();
    const isCmd = event.metaKey || event.ctrlKey;

    // r - Refresh
    if (key === 'r' && !isCmd && handlers.onRefresh) {
      event.preventDefault();
      handlers.onRefresh();
    }

    // b - Toggle bookmarks
    if (key === 'b' && !isCmd && handlers.onToggleBookmarks) {
      event.preventDefault();
      handlers.onToggleBookmarks();
    }

    // d - Toggle dark mode
    if (key === 'd' && !isCmd && handlers.onToggleDarkMode) {
      event.preventDefault();
      handlers.onToggleDarkMode();
    }

    // / or s - Focus search
    if ((key === '/' || key === 's') && !isCmd && handlers.onFocusSearch) {
      event.preventDefault();
      handlers.onFocusSearch();
    }

    // Escape - Clear search or close panels
    if (key === 'escape') {
      if (handlers.onClearSearch) {
        handlers.onClearSearch();
      }
    }
  }, [handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
