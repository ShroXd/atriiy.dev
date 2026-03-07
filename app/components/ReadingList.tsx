'use client'

import { motion } from 'framer-motion'
import type { ReadingFile, ReadingStatus } from 'app/reading/utils'

const statusStyle: Record<ReadingStatus, string> = {
  Reading: 'bg-[var(--color-accent-soft)] border-[var(--color-accent-soft-border)] text-[var(--color-subtle)]',
  Finished: 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500',
  Queued: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-500',
}

interface ReadingListProps {
  data: ReadingFile[]
}

export function ReadingList({ data }: ReadingListProps) {
  const sorted = [...data].sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <div className='space-y-10'>
      {sorted.map(file => (
        <div key={file.year}>
          <p className='mb-6 font-mono text-xs text-neutral-400'>{file.year}</p>
          <ul className='flex flex-col gap-5'>
            {file.books.map((book, i) => (
              <motion.li
                key={`${file.year}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: i * 0.05 }}
              >
                <div className='flex items-center gap-2.5'>
                  <span className='text-sm text-[var(--color-heading)]'>
                    {book.title}
                  </span>
                  <span className='text-xs text-neutral-400'>
                    {book.author}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyle[book.status]}`}>
                    {book.status}
                  </span>
                </div>
                {book.comments && (
                  <p className='mt-1.5 text-xs text-[var(--color-subtle)] leading-relaxed'>
                    {book.comments}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
