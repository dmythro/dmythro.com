'use client'

import { initTheme } from 'src/utils/theme'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${initTheme.toString().replace(/\s+/g, ' ')})()`,
          }}
        />
      </head>
      <body>
        <div>
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  )
}
