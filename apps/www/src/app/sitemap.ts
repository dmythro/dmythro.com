import { BASE_URL } from 'my-constants'
import type { MetadataRoute } from 'next'

const urls = ['', '/built-with', '/guitars/string-tension']

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
