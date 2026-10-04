import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/data'

/**
 * Explicitly welcome search engines AND AI assistants/answer engines.
 * (An explicit allow is clearer than relying on the '*' fallback, and some
 * crawlers/WAFs treat unlisted bots more strictly.)
 */
const AI_AND_SEARCH_BOTS = [
  // OpenAI / ChatGPT
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic / Claude
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  // Google Gemini / AI Overviews
  'Google-Extended',
  'GoogleOther',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Microsoft Copilot / Bing
  'Bingbot',
  // Others
  'Applebot',
  'Applebot-Extended',
  'DuckDuckBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Bytespider',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: AI_AND_SEARCH_BOTS,
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}sitemap.xml`,
    host: SITE_URL,
  }
}
