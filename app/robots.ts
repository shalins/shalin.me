import { baseUrl } from 'app/sitemap'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/bookmac'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
