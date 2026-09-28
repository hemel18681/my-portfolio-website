import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: 'standalone',
  devIndicators: false,
  images: {
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
