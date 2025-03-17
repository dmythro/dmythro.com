'use client'

import type { ReactNode } from 'react'
import { HeroUIProvider } from '@heroui/system'

export function Providers({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>
}
