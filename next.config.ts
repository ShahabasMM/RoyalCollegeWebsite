import type { NextConfig } from 'next'
const nextConfig: NextConfig = { images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      // Google Drive links pasted into the CMS are rewritten to this host,
      // which serves the image bytes. See lib/imageUrl.ts.
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh4.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh5.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh6.googleusercontent.com' },
    ],
    qualities: [75, 80, 82],
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1600, 1920, 2560, 3840],
  } }
export default nextConfig
