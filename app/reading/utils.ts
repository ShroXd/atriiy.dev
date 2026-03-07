import fs from 'fs'
import path from 'path'

import { parseFrontmatter } from 'app/lib/mdx'

export type ReadingStatus = 'Reading' | 'Finished' | 'Queued'

export type BookEntry = {
  title: string
  author: string
  publishedAt: string
  status: ReadingStatus
  comments?: string
}

export type ReadingFile = {
  year: string
  books: BookEntry[]
}

function parseBookSection(title: string, sectionLines: string[]): BookEntry {
  const meta: Record<string, string> = {}
  const commentLines: string[] = []
  let pastMeta = false

  for (const line of sectionLines) {
    const trimmed = line.trim()
    if (!pastMeta && /^-\s+\w+:/.test(trimmed)) {
      const match = trimmed.match(/^-\s+(\w+):\s*(.*)/)
      if (match) meta[match[1]] = match[2].trim()
    } else {
      pastMeta = true
      commentLines.push(line)
    }
  }

  const comments = commentLines.join('\n').trim()
  return {
    title,
    author: meta.author ?? '',
    publishedAt: meta.publishedAt ?? '',
    status: (meta.status as ReadingStatus) ?? 'Queued',
    ...(comments ? { comments } : {}),
  }
}

function parseContent(content: string): BookEntry[] {
  const books: BookEntry[] = []
  const lines = content.split('\n')

  let currentTitle: string | null = null
  let currentLines: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('## ')) {
      if (currentTitle) {
        books.push(parseBookSection(currentTitle, currentLines))
      }
      currentTitle = trimmed.slice(3).trim()
      currentLines = []
    } else if (currentTitle) {
      currentLines.push(line)
    }
  }

  if (currentTitle) {
    books.push(parseBookSection(currentTitle, currentLines))
  }

  return books
}

export function getReadingEntries(): ReadingFile[] {
  const dir = path.join(process.cwd(), 'app', 'reading', 'books')
  const files = fs.readdirSync(dir).filter(f => path.extname(f) === '.mdx')

  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { metadata, content } = parseFrontmatter<{ year: string }>(raw)
    return {
      year: metadata.year ?? path.basename(file, '.mdx'),
      books: parseContent(content),
    }
  })
}
