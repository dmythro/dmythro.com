export interface NpmStats {
  downloads: number
  package: string
}

export async function fetchNpmStats(packageName: string): Promise<NpmStats> {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${packageName}`,
    )
    if (!res.ok) return { downloads: 0, package: packageName }
    const data = await res.json()
    return { downloads: data.downloads ?? 0, package: packageName }
  } catch {
    return { downloads: 0, package: packageName }
  }
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}
