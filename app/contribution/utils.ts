import fs from 'fs'
import path from 'path'

import { parseFrontmatter } from 'app/lib/mdx'

export type PRStatus = 'merged' | 'open' | 'closed' | 'draft'

export type PREntry = {
  title: string
  url: string
  status?: PRStatus
}

export type RepoGroup = {
  repo: string
  prs: PREntry[]
}

export type ContributionFile = {
  year: string
  groups: RepoGroup[]
}

function parsePRLine(line: string): PREntry | null {
  // Match: - [title](url) #status
  const match = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)(?:\s+#(\w+))?/)
  if (!match) return null
  return {
    title: match[1],
    url: match[2],
    status: (match[3] as PRStatus) ?? undefined,
  }
}

function parseContent(content: string): RepoGroup[] {
  const groups: RepoGroup[] = []
  const lines = content.split('\n')

  let currentRepo: string | null = null
  let currentPRs: PREntry[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('## ')) {
      if (currentRepo) {
        groups.push({ repo: currentRepo, prs: currentPRs })
      }
      currentRepo = trimmed.slice(3).trim()
      currentPRs = []
    } else if (trimmed.startsWith('- ') && currentRepo) {
      const pr = parsePRLine(trimmed)
      if (pr) currentPRs.push(pr)
    }
  }

  if (currentRepo) {
    groups.push({ repo: currentRepo, prs: currentPRs })
  }

  return groups
}

export function getContributionEntries(): ContributionFile[] {
  const dir = path.join(process.cwd(), 'app', 'contribution', 'prs')
  const files = fs.readdirSync(dir).filter(f => path.extname(f) === '.mdx')

  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { metadata, content } = parseFrontmatter<{ year: string }>(raw)
    return {
      year: metadata.year ?? path.basename(file, '.mdx'),
      groups: parseContent(content),
    }
  })
}
