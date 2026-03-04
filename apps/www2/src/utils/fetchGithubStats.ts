export interface GithubStats {
  stars: number
  repo: string
}

export async function fetchGithubStats(repo: string, fallbackStars = 0): Promise<GithubStats> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'dmythro.com',
    }
    const token = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers })
    if (!res.ok) return { stars: fallbackStars, repo }
    const data = await res.json()
    return { stars: data.stargazers_count ?? fallbackStars, repo }
  } catch {
    return { stars: fallbackStars, repo }
  }
}
