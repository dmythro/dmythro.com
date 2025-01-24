'use client'

import { HeroUIProvider } from '@heroui/system'

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>
}
