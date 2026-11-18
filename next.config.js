// Bookmac (personal research workbench) lives at /bookmac, proxied from its
// own Vercel deployment. It is private-ish: never indexed by search engines.
const BOOKMAC = 'https://bookmac-mocha.vercel.app'

const nextConfig = {
  // Serve /bookmac and /bookmac/ alike.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/bookmac', destination: `${BOOKMAC}/` },
        { source: '/bookmac/:path*', destination: `${BOOKMAC}/:path*` },
      ],
    }
  },
  async headers() {
    return [
      {
        source: '/bookmac/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ]
  },
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
