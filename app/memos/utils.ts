import path from 'path'

import { getMDXData, type MDXEntry } from 'app/lib/mdx'

export type MemoMetadata = {
  publishedAt: string
  tags?: string[]
}

export type MemoEntry = MDXEntry<MemoMetadata>

export function getMemoEntries(): MemoEntry[] {
  return getMDXData<MemoMetadata>(
    path.join(process.cwd(), 'app', 'memos', 'notes')
  )
}
