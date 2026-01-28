'use client';

import { useSyncExternalStore, useCallback, useMemo } from 'react';
import type { NewsItem } from '@/types/news';

const STORAGE_KEY = 'ai-news-bookmarks';

// Store for managing bookmarks
let bookmarksCache: NewsItem[] = [];
const listeners: Set<() => void> = new Set();

function getSnapshot(): NewsItem[] {
  return bookmarksCache;
}

function getServerSnapshot(): NewsItem[] {
  return [];
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emitChange() {
  listeners.forEach(listener => listener());
}

function loadFromStorage(): NewsItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Error loading bookmarks:', error);
  }
  return [];
}

function saveToStorage(bookmarks: NewsItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
  }
}

// Initialize cache from storage
if (typeof window !== 'undefined') {
  bookmarksCache = loadFromStorage();
}

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addBookmark = useCallback((item: NewsItem) => {
    if (bookmarksCache.some(b => b.id === item.id)) return;
    bookmarksCache = [{ ...item, bookmarkedAt: new Date().toISOString() }, ...bookmarksCache];
    saveToStorage(bookmarksCache);
    emitChange();
  }, []);

  const removeBookmark = useCallback((id: string) => {
    bookmarksCache = bookmarksCache.filter(b => b.id !== id);
    saveToStorage(bookmarksCache);
    emitChange();
  }, []);

  const toggleBookmark = useCallback((item: NewsItem) => {
    const exists = bookmarksCache.some(b => b.id === item.id);
    if (exists) {
      removeBookmark(item.id);
    } else {
      addBookmark(item);
    }
  }, [addBookmark, removeBookmark]);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const clearAll = useCallback(() => {
    bookmarksCache = [];
    saveToStorage(bookmarksCache);
    emitChange();
  }, []);

  const count = useMemo(() => bookmarks.length, [bookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    clearAll,
    count,
  };
}
