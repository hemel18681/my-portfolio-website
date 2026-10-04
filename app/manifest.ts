import type { MetadataRoute } from 'next'
import { profile } from '@/lib/data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} \u2014 Freelance Full Stack Developer`,
    short_name: 'Asif Hemel',
    description:
      'Portfolio of Asif Uddin Ahmed Hemel: freelance full-stack developer (React, Next.js, Angular, Node.js, .NET, AWS).',
    start_url: '/',
    display: 'standalone',
    background_color: '#080b18',
    theme_color: '#080b18',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
