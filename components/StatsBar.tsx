'use client';

import { useMemo, useState, useEffect } from 'react';
import type { NewsItem } from '@/types/news';

interface StatsBarProps {
  news: NewsItem[];
  lastUpdated: string | null;
}

function formatTimeSince(dateStr: string | null): string {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  return `${hours} hours ago`;
}

export function StatsBar({ news, lastUpdated }: StatsBarProps) {
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>('—');

  // Update time display periodically
  useEffect(() => {
    const updateTime = () => setTimeSinceUpdate(formatTimeSince(lastUpdated));
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const stats = useMemo(() => {
    const total = news.length;
    const hot = news.filter(n => n.isHot).length;
    const today = news.filter(n => {
      const itemDate = new Date(n.date).toDateString();
      const todayDate = new Date().toDateString();
      return itemDate === todayDate;
    }).length;
    
    // Source breakdown
    const bySource = news.reduce((acc, item) => {
      // Group similar sources
      let source = item.source;
      if (source.startsWith('r/')) source = 'Reddit';
      if (source === 'Hacker News') source = 'HN';
      
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, hot, today, bySource };
  }, [news]);

  return (
    <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Total */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
        <div className="text-2xl font-bold">{stats.total}</div>
        <div className="text-blue-100 text-sm">Total Articles</div>
      </div>

      {/* Hot */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg">
        <div className="text-2xl font-bold flex items-center gap-1">
          🔥 {stats.hot}
        </div>
        <div className="text-red-100 text-sm">Hot Stories</div>
      </div>

      {/* Today */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
        <div className="text-2xl font-bold">{stats.today}</div>
        <div className="text-green-100 text-sm">From Today</div>
      </div>

      {/* Last Update */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-lg">
        <div className="text-lg font-bold truncate">{timeSinceUpdate}</div>
        <div className="text-purple-100 text-sm">Last Refresh</div>
      </div>
    </div>
  );
}
