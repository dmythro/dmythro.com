import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

import 'src/styles/global.css'
import { GA_TRACKING_ID } from 'src/utils/analytics'

const GA_DEBUG = process.env.NODE_ENV === 'development' ? 'true' : 'false'

export { viewport } from 'src/constants'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_TRACKING_ID}', { debug_mode: ${GA_DEBUG} });
`,
        }}
      />
    </>
  )
}
