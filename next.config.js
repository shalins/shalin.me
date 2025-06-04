/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  experimental: {
    outputFileTracingExcludes: {
      'app/rss/route.js': ['.next/cache/**', 'node_modules/**'],
    },
  },
}

module.exports = nextConfig 