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
      'app/rss/route.js': ['.next/cache/**', 'node_modules/**', '.git/**'],
      'app/writings/[slug]/page.js': ['.next/cache/**', 'node_modules/**', '.git/**'],
      'app/atalier/[slug]/page.js': ['.next/cache/**', 'node_modules/**', '.git/**'],
      '*': ['.git/**'],
    },
  },
}

module.exports = nextConfig 