export type LocaleCode = 'en' | 'uk'

export interface InterestLocale {
  title: string
  description: string
  tldr?: string
  text?: string[]
}

export interface TimelineItem {
  title?: string
  subtitle?: string
  description?: string | string[]
  where?: string
  when?: string
  till?: string
  isHighlighted?: boolean
}
