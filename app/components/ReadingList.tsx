import type { ReadingEntry, ReadingStatus } from 'app/reading/utils'

import { CustomMDX } from './mdx'

const statusTone: Record<ReadingStatus, string> = {
  Reading: 'text-[#1f3b63]',
  Finished: 'text-[#2f5b34]',
  Revisiting: 'text-[#553d73]',
  Queued: 'text-[#7b5322]',
}

interface ReadingListProps {
  entries: ReadingEntry[]
}

export function ReadingList({ entries }: ReadingListProps) {
  return (
    <div
      className='columns-1 md:columns-2 lg:columns-3'
      style={{ columnGap: '1.5rem' }}
    >
      {[...entries]
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map(entry => (
          <article
            key={entry.slug}
            style={{ breakInside: 'avoid' }}
            className='mb-8 inline-block w-full'
          >
            <header className='flex items-baseline justify-between gap-3 border-b border-[#d5d5c6] pb-2'>
              <div className='space-y-1'>
                <h2 className='font-montserrat text-lg font-semibold tracking-tight text-neutral-800'>
                  {entry.metadata.title}
                </h2>
                <p className='text-sm text-neutral-600'>
                  {entry.metadata.author} · {entry.metadata.year}
                </p>
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${statusTone[entry.metadata.status]}`}
              >
                {entry.metadata.status}
              </span>
            </header>

            <div className='mt-3 space-y-3 border-l-2 border-[#d0d0c0] pl-4'>
              <div className='prose prose-sm max-w-none text-[rgb(74,74,64)]'>
                <CustomMDX
                  source={entry.content}
                  frontmatter={entry.metadata}
                />
              </div>
              {entry.metadata.tags && entry.metadata.tags.length > 0 && (
                <div className='flex flex-wrap gap-2 text-xs text-neutral-600'>
                  {entry.metadata.tags.map(tag => (
                    <span
                      key={`${entry.slug}-${tag}`}
                      className='rounded-full bg-neutral-200/60 px-2 py-1 font-semibold tracking-tight'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
    </div>
  )
}
