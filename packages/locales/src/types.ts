export type LocaleCode = 'en' | 'uk'

export type InterestLocale = {
  title: string
  subtitle?: string
  description: string
  tldr?: string
  text?: string[]
}

export type SkillLevel = 'basic' | 'advanced' | 'proficient' | 'expert'

export type SkillTime = {
  title: string
  level: SkillLevel
  subtitle: string
  description: string | string[]
  times: string[]
}

export type TimelineItem = {
  title?: string
  subtitle?: string
  description?: string | string[]
  where?: string
  when?: string
  till?: string
  isHighlighted?: boolean
  /** Still ongoing. Renders green, and wins over `isHighlighted`. */
  isCurrent?: boolean
  /** Picks the icon. Defaults to `work`. */
  kind?: 'work' | 'education'
}
