import { MetadataRoute } from 'next'
import { siteMeta } from '../data/content'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${siteMeta.url}/sitemap.xml`,
  }
}
