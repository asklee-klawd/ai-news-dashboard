import { NextResponse } from 'next/server';
import type { NewsItem } from '@/types/news';

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI announces GPT-5 with unprecedented reasoning capabilities',
    url: 'https://openai.com/blog/gpt-5',
    source: 'OpenAI Blog',
    date: '2026-01-28',
    isHot: true,
  },
  {
    id: '2',
    title: 'Anthropic releases Claude 4 with 1M token context window',
    url: 'https://anthropic.com/news/claude-4',
    source: 'Anthropic',
    date: '2026-01-28',
    isHot: true,
  },
  {
    id: '3',
    title: 'Google DeepMind achieves AGI milestone in scientific reasoning',
    url: 'https://deepmind.google/research/agi-milestone',
    source: 'DeepMind',
    date: '2026-01-27',
  },
  {
    id: '4',
    title: 'Meta open-sources Llama 4 with 400B parameters',
    url: 'https://ai.meta.com/llama-4',
    source: 'Meta AI',
    date: '2026-01-27',
  },
  {
    id: '5',
    title: 'Stability AI launches real-time video generation model',
    url: 'https://stability.ai/video-gen',
    source: 'Stability AI',
    date: '2026-01-26',
  },
  {
    id: '6',
    title: 'Hugging Face reaches 1 million open-source models',
    url: 'https://huggingface.co/blog/1m-models',
    source: 'Hugging Face',
    date: '2026-01-26',
  },
  {
    id: '7',
    title: 'EU AI Act enters full enforcement phase',
    url: 'https://ec.europa.eu/ai-act-enforcement',
    source: 'European Commission',
    date: '2026-01-25',
  },
  {
    id: '8',
    title: 'NVIDIA unveils H200 GPU with 3x inference speedup',
    url: 'https://nvidia.com/h200-launch',
    source: 'NVIDIA',
    date: '2026-01-25',
    isHot: true,
  },
];

export async function GET(): Promise<NextResponse<NewsItem[]>> {
  return NextResponse.json(mockNews);
}
