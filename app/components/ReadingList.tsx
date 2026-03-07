'use client'

import { motion } from 'framer-motion'
import type { ReadingEntry, ReadingStatus } from 'app/reading/utils'

const statusStyle: Record<ReadingStatus, string> = {
  Reading: 'bg-[var(--color-accent-soft)] border-[var(--color-accent-soft-border)] text-[var(--color-subtle)]',
  Finished: 'bg-neutral-100 border-neutral-200 text-neutral-500',
  Queued: 'bg-amber-50 border-amber-200 text-amber-600',
}

interface ReadingListProps {
  entries: ReadingEntry[]
}

export function ReadingList({ entries }: ReadingListProps) {
  const statusOrder: Record<ReadingStatus, number> = { Reading: 0, Queued: 1, Finished: 2 }
  const sorted = [...entries].sort(
    (a, b) => statusOrder[a.metadata.status] - statusOrder[b.metadata.status]
  )

  return (
    <ul className='flex flex-col items-start gap-2'>
      {sorted.map((entry, i) => (
        <motion.li
          key={entry.slug}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: i * 0.05 }}
          className='flex items-center gap-2.5'
        >
          <span className='text-sm text-[var(--color-heading)]'>
            {entry.metadata.title}
          </span>
          <span className='text-xs text-neutral-400'>
            {entry.metadata.author}
          </span>
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyle[entry.metadata.status]}`}>
            {entry.metadata.status}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}
