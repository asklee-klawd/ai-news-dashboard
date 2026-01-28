# 🤖 AI News Dashboard

A modern, real-time AI news aggregator built with Next.js 14+. Prioritizes Claude, Agents, and Productivity content.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?style=flat&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat)

## ✨ Features

### 📰 Real-Time News Aggregation
- **Hacker News** - AI-filtered top stories
- **Reddit** - r/MachineLearning, r/artificial, r/LocalLLaMA, r/ChatGPT, r/singularity
- **RSS Feeds** - OpenAI, Anthropic, Google AI, DeepMind, Hugging Face, MIT

### 🎯 Content Prioritization
- Focus on **Claude**, **Agents**, and **Productivity**
- Relevance scoring for news ranking
- High-priority topics highlighted with ⭐

### 🔍 Search & Filter
- Real-time search by title/source
- Filter by news source
- Trending topics tag cloud (clickable)

### 📚 Personalization
- **Bookmarks** - Save articles for later
- **Read History** - Track what you've read
- **Slide-out panel** for saved articles

### 🎨 Beautiful UI
- Dark mode support
- Loading skeletons
- Staggered fade-in animations
- Responsive design

### ⌨️ Power User Features
- Keyboard shortcuts (R, B, D, /, Esc)
- Stats dashboard (total, hot, today)
- New articles toast notification

### 📱 PWA Ready
- Installable on mobile/desktop
- Offline fallback page
- Service Worker caching

### 🚀 DevOps
- Docker + Docker Compose
- GitHub Actions CI/CD
- Auto-push to GHCR
- 20+ unit tests

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production (Docker)

```bash
docker-compose up --build
```

### Testing

```bash
npm test
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `R` | Refresh news |
| `B` | Toggle bookmarks |
| `D` | Toggle dark mode |
| `/` | Focus search |
| `Esc` | Clear/close |

## 📁 Project Structure

```
ai-news-dashboard/
├── app/
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   └── api/news/          # News API
├── components/
│   ├── NewsCard.tsx       # News card
│   ├── SearchFilter.tsx   # Search & filter
│   ├── TrendingTopics.tsx # Tag cloud
│   ├── StatsBar.tsx       # Stats dashboard
│   ├── BookmarksPanel.tsx # Saved articles
│   └── ...
├── lib/
│   ├── sources/           # Data sources
│   ├── hooks/             # React hooks
│   └── utils/             # Utilities
├── __tests__/             # Test suite
├── public/
│   ├── sw.js              # Service Worker
│   └── manifest.json      # PWA manifest
├── Dockerfile
└── docker-compose.yml
```

## 🔌 API

### GET /api/news

Returns aggregated AI news from all sources.

```json
{
  "items": [...],
  "sources": [
    { "name": "Hacker News", "count": 5, "status": "ok" }
  ],
  "trending": [
    { "term": "Claude", "count": 8, "weight": 1, "isHighPriority": true }
  ],
  "fetchedAt": "2024-01-28T..."
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch
```

## 📜 Changelog

### v1.0.0 (2026-01-28)
- ✅ Real data from HN, Reddit, RSS
- ✅ Search & filter
- ✅ Trending topics tag cloud
- ✅ Bookmarks & save for later
- ✅ Share buttons (X, LinkedIn, Reddit, HN)
- ✅ Stats dashboard
- ✅ Keyboard shortcuts
- ✅ PWA support
- ✅ Content focus on Claude/Agents/Productivity
- ✅ Reading history
- ✅ New articles toast
- ✅ 20+ unit tests
- ✅ Docker + GitHub Actions CI

## 📜 License

MIT

---

🐾 Crafted with love by **Klawd** • Built overnight for Alex
