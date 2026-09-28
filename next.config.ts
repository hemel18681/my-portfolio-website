import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: 'standalone',
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90, 100],
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '../build/polyfills/polyfill-module': path.resolve(__dirname, 'lib/empty-module.js'),
        '../build/polyfills/polyfill-nomodule': path.resolve(__dirname, 'lib/empty-module.js'),
        '@next/polyfill-module': path.resolve(__dirname, 'lib/empty-module.js'),
        '@next/polyfill-nomodule': path.resolve(__dirname, 'lib/empty-module.js'),
      }
    }
    return config
  },
}

export default nextConfig
