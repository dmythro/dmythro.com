export interface GithubStats {
  stars: number
  repo: string
}

export async function fetchGithubStats(repo: string): Promise<GithubStats> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'dmythro.com',
      },
    })
    if (!res.ok) return { stars: 0, repo }
    const data = await res.json()
    return { stars: data.stargazers_count ?? 0, repo }
  } catch {
    return { stars: 0, repo }
  }
}
