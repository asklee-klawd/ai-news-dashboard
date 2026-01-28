'use client';

import { useSyncExternalStore } from 'react';

function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 5) return '🌙 Late night AI research?';
  if (hour < 12) return '☀️ Good morning! Here\'s your AI news';
  if (hour < 17) return '🌤️ Good afternoon! AI updates for you';
  if (hour < 21) return '🌆 Good evening! Catch up on AI news';
  return '🌙 Night owl? Here\'s the latest in AI';
}

function subscribe(callback: () => void): () => void {
  // Update every minute
  const interval = setInterval(callback, 60000);
  return () => clearInterval(interval);
}

function getSnapshot(): string {
  return getGreeting();
}

function getServerSnapshot(): string {
  return 'Welcome to AI News';
}

export function Greeting() {
  const greeting = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {greeting}
    </p>
  );
}
