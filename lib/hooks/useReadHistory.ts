'use client';

import { useSyncExternalStore, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'ai-news-read-history';
const MAX_HISTORY = 100;

interface ReadHistoryItem {
  id: string;
  title: string;
  source: string;
  readAt: string;
}

// Store for managing read history
let historyCache: ReadHistoryItem[] = [];
const listeners: Set<() => void> = new Set();

function getSnapshot(): ReadHistoryItem[] {
  return historyCache;
}

function getServerSnapshot(): ReadHistoryItem[] {
  return [];
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emitChange() {
  listeners.forEach(listener => listener());
}

function loadFromStorage(): ReadHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Error loading read history:', error);
  }
  return [];
}

function saveToStorage(history: ReadHistoryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving read history:', error);
  }
}

// Initialize cache from storage
if (typeof window !== 'undefined') {
  historyCache = loadFromStorage();
}

export function useReadHistory() {
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const markAsRead = useCallback((id: string, title: string, source: string) => {
    // Don't add if already in history
    if (historyCache.some(h => h.id === id)) return;

    const newItem: ReadHistoryItem = {
      id,
      title,
      source,
      readAt: new Date().toISOString(),
    };

    // Add to front and trim
    historyCache = [newItem, ...historyCache].slice(0, MAX_HISTORY);
    saveToStorage(historyCache);
    emitChange();
  }, []);

  const isRead = useCallback((id: string) => {
    return history.some(h => h.id === id);
  }, [history]);

  const clearHistory = useCallback(() => {
    historyCache = [];
    saveToStorage(historyCache);
    emitChange();
  }, []);

  // Get preferred sources based on reading history
  const preferredSources = useMemo(() => {
    const sourceCounts = history.reduce((acc, item) => {
      acc[item.source] = (acc[item.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source]) => source);
  }, [history]);

  return {
    history,
    markAsRead,
    isRead,
    clearHistory,
    preferredSources,
    count: history.length,
  };
}
