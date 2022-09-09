import React from 'react'
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { CssBaseline } from '@nextui-org/react'

import { GA_TRACKING_ID } from 'src/analytics'

const GA_DEBUG = process.env.NODE_ENV === 'development' ? 'true' : 'false'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {CssBaseline.flush()}
        </Head>
        <body>
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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
