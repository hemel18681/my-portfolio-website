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
  experimental: {
    // Tree-shake large packages — only bundle the icons/components actually used
    optimizePackageImports: [
      'lucide-react',
      'motion',
      'motion/react',
      'react-icons',
    ],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      const emptyModule = path.resolve(__dirname, 'lib/empty-module.js')

      config.resolve.alias = {
        ...config.resolve.alias,
        // Strip polyfills (already handled by browserslist)
        '../build/polyfills/polyfill-module': emptyModule,
        '../build/polyfills/polyfill-nomodule': emptyModule,
        '@next/polyfill-module': emptyModule,
        '@next/polyfill-nomodule': emptyModule,
      }

      // In production builds, stub out the Next.js dev overlay/devtools.
      // Next.js 15.x bundles these even when devIndicators: false, adding ~198 KiB.
      if (!dev) {
        const devtoolsAliases: Record<string, string> = {
          'next/dist/next-devtools/userspace/app/app-dev-overlay-setup': emptyModule,
          'next/dist/next-devtools/userspace/app/app-dev-overlay-error-boundary': emptyModule,
          'next/dist/next-devtools/userspace/app/client-entry': emptyModule,
          'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup': emptyModule,
          'next/dist/next-devtools/userspace/pages/pages-dev-overlay-error-boundary': emptyModule,
          'next/dist/esm/next-devtools/userspace/app/app-dev-overlay-setup': emptyModule,
          'next/dist/esm/next-devtools/userspace/app/app-dev-overlay-error-boundary': emptyModule,
          'next/dist/esm/next-devtools/userspace/app/client-entry': emptyModule,
          'next/dist/esm/next-devtools/userspace/pages/pages-dev-overlay-setup': emptyModule,
          'next/dist/esm/next-devtools/userspace/pages/pages-dev-overlay-error-boundary': emptyModule,
        }
        config.resolve.alias = {
          ...config.resolve.alias,
          ...devtoolsAliases,
        }
      }
    }
    return config
  },
}

export default nextConfig
