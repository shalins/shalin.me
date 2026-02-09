const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  experimental: {
    outputFileTracingExcludes: {
      'app/rss/route.js': ['.next/cache/**', 'node_modules/**', '.git/**'],
      'app/writings/[slug]/page.js': ['.next/cache/**', 'node_modules/**', '.git/**'],
      'app/atalier/[slug]/page.js': ['.next/cache/**', 'node_modules/**', '.git/**'],
      '*': [
        '.git/**',
        '.pnpm-store/**',
        'public/media/**',
        '.next/cache/**',
        'node_modules/.cache/**',
      ],
    },
  },
}
module.exports = nextConfig
