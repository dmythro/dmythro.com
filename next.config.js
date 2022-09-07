/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
  },
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
