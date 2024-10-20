import type { MetadataRoute } from 'next'

const baseUrl = 'https://dmythro.com'
const urls = ['', '/built-with']

export default function sitemap(): MetadataRoute.Sitemap {
  return urls.map((url) => ({
    url: `${baseUrl}/en${url}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${baseUrl}/en${url}`,
        uk: `${baseUrl}/uk${url}`,
      },
    },
  }))
}
