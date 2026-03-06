import { projects } from '@/data/projects'

import { fetchGithubStats } from './fetchGithubStats'
import { fetchNpmStats, formatNumber } from './fetchNpmStats'

export interface AggregateStats {
  totalDownloads: number
  totalStars: number
  totalDownloadsFormatted: string
  totalStarsFormatted: string
  yearsExperience: number
}

export async function fetchAggregateStats(): Promise<AggregateStats> {
  const npmProjects = projects.filter((p) => p.tags.includes('npm') && p.npm)
  const ossProjects = projects.filter((p) => p.github)

  const [npmResults, ghResults] = await Promise.all([
    Promise.all(npmProjects.map((p) => fetchNpmStats(p.npm!))),
    Promise.all(ossProjects.map((p) => fetchGithubStats(p.github!, p.fallbackStars))),
  ])

  const totalDownloads = npmResults.reduce((sum, r) => sum + r.downloads, 0)

  const totalStars = ghResults.reduce((sum, r) => sum + r.stars, 0)

  return {
    totalDownloads,
    totalStars,
    totalDownloadsFormatted: formatNumber(totalDownloads),
    totalStarsFormatted: formatNumber(totalStars),
    yearsExperience: new Date().getFullYear() - 2006,
  }
}
