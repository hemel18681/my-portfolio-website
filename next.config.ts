import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  devIndicators: false,
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
