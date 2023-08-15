import { Analytics } from '@vercel/analytics/react'

import 'src/styles/global.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
