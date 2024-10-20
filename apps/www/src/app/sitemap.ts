import type { MetadataRoute } from 'next'
import { BASE_URL } from 'my-constants/dist/index.mjs'

const urls = ['', '/built-with']

export default function sitemap(): MetadataRoute.Sitemap {
  return urls.map((url) => ({
    url: `${BASE_URL}/en${url}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${BASE_URL}/en${url}`,
        uk: `${BASE_URL}/uk${url}`,
      },
    },
  }))
}
