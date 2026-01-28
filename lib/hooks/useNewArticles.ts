'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { NewsItem, NewsResponse } from '@/types/news';

const CHECK_INTERVAL = 2 * 60 * 1000; // Check every 2 minutes

export function useNewArticles(currentItems: NewsItem[]) {
  const [latestFetch, setLatestFetch] = useState<NewsItem[]>([]);
  const previousItemsRef = useRef<string[]>([]);

  // Memoize current IDs
  const currentIds = useMemo(
    () => new Set(currentItems.map(item => item.id)),
    [currentItems]
  );

  // Update ref when items change
  useEffect(() => {
    previousItemsRef.current = currentItems.map(item => item.id);
  }, [currentItems]);

  // Background check for new articles
  useEffect(() => {
    const checkForNew = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) return;
        
        const data: NewsResponse = await response.json();
        setLatestFetch(data.items);
      } catch (error) {
        console.error('Error checking for new articles:', error);
      }
    };

    const interval = setInterval(checkForNew, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Calculate new items
  const newItems = useMemo(() => {
    if (latestFetch.length === 0) return [];
    return latestFetch.filter(item => !currentIds.has(item.id));
  }, [latestFetch, currentIds]);

  const dismiss = useCallback(() => {
    setLatestFetch([]);
  }, []);

  return {
    newCount: newItems.length,
    pendingItems: newItems,
    dismiss,
  };
}
