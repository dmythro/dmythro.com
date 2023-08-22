export type LocaleCode = 'en' | 'uk'

export interface InterestLocale {
  title: string
  description: string
  tldr?: string
  text?: string[]
}

export type SkillLevel = 'basic' | 'advanced' | 'proficient' | 'expert'

export interface SkillTime {
  title: string
  level?: SkillLevel
  subtitle?: string
  description?: string
  times: string[]
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
