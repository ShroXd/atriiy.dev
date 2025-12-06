import path from 'path'

import { getMDXData, type MDXEntry } from 'app/lib/mdx'

export type ReadingStatus = 'Reading' | 'Finished' | 'Revisiting' | 'Queued'

export type ReadingMetadata = {
  title: string
  author: string
  year: string
  status: ReadingStatus
  publishedAt: string
  tags?: string[]
  cover?: string
}

export type ReadingEntry = MDXEntry<ReadingMetadata>

export function getReadingEntries(): ReadingEntry[] {
  return getMDXData<ReadingMetadata>(
    path.join(process.cwd(), 'app', 'reading', 'posts')
  )
}
