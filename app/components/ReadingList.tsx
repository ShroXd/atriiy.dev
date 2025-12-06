import type { ReadingEntry, ReadingStatus } from 'app/reading/utils'

import { CustomMDX } from './mdx'

const statusTone: Record<ReadingStatus, string> = {
  Reading: 'text-[#1f3b63]',
  Finished: 'text-[#2f5b34]',
  Revisiting: 'text-[#553d73]',
  Queued: 'text-[#7b5322]',
}

const statusPin: Record<ReadingStatus, string> = {
  Reading: '#2f6fc2',
  Finished: '#4c8b4e',
  Revisiting: '#7b5fa4',
  Queued: '#c27a2f',
}

const notePalette = ['#fdf7e3', '#f6f0ff', '#eef7ff', '#f5f7ec']
const rotationOffsets = ['-0.4deg', '0.2deg', '-0.15deg', '0.35deg']

interface ReadingListProps {
  entries: ReadingEntry[]
}

const fallbackCover =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="640" viewBox="0 0 480 640" fill="none"><rect width="480" height="640" rx="22" fill="%23e9e3d4"/><rect x="40" y="80" width="400" height="200" rx="16" fill="%23d0c8b6"/><rect x="40" y="308" width="260" height="16" rx="8" fill="%23c1b8a3"/><rect x="40" y="336" width="220" height="16" rx="8" fill="%23c1b8a3"/><rect x="40" y="372" width="320" height="12" rx="6" fill="%23b2a995"/><rect x="40" y="392" width="280" height="12" rx="6" fill="%23b2a995"/><rect x="40" y="412" width="210" height="12" rx="6" fill="%23b2a995"/></svg>'

export function ReadingList({ entries }: ReadingListProps) {
  return (
    <div className='columns-1 md:columns-3' style={{ columnGap: '1.75rem' }}>
      {[...entries]
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((entry, idx) => {
          const bg = notePalette[idx % notePalette.length]
          const rotation = rotationOffsets[idx % rotationOffsets.length]
          const coverSrc = entry.metadata.cover || fallbackCover
          return (
            <article
              key={entry.slug}
              className='group relative mb-8 inline-block w-full rounded-3xl px-5 pb-6 pt-7 shadow-[0_18px_36px_rgba(0,0,0,0.06)] ring-1 ring-[#e6e1d4] transition-transform duration-200 hover:-translate-y-1'
              // pinterest-like offset and soft paper feel
              // eslint-disable-next-line react/forbid-dom-props
              style={{
                breakInside: 'avoid',
                backgroundColor: bg,
                transform: `rotate(${rotation})`,
              }}
            >
              <span
                className='absolute left-5 top-3 h-2.5 w-2.5 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.18)]'
                style={{ backgroundColor: statusPin[entry.metadata.status] }}
                aria-hidden
              />
              <span
                className='absolute left-4 right-4 top-2 block h-3 rounded-full bg-white/50 opacity-70 blur-[1px]'
                aria-hidden
              />

              <div className='mb-4 overflow-hidden rounded-2xl border border-[#ddd6c5] shadow-[0_6px_18px_rgba(0,0,0,0.08)]'>
                <div
                  className='h-48 w-full bg-cover bg-center'
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0.06)), url(${coverSrc})`,
                  }}
                />
              </div>

              <header className='mb-3 space-y-2'>
                <div className='flex items-baseline justify-between gap-3'>
                  <div className='space-y-1'>
                    <p className='text-xs uppercase tracking-[0.18em] text-neutral-500'>
                      {entry.metadata.status}
                    </p>
                    <h2 className='font-montserrat text-lg font-semibold tracking-tight text-neutral-800'>
                      {entry.metadata.title}
                    </h2>
                    <p className='text-sm text-neutral-600'>
                      {entry.metadata.author} · {entry.metadata.year}
                    </p>
                  </div>
                </div>
              </header>

              <div className='space-y-3'>
                <div className='prose prose-sm max-w-none text-[rgb(74,74,64)]'>
                  <CustomMDX
                    source={entry.content}
                    frontmatter={entry.metadata}
                    markFirstParagraph={false}
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
          )
        })}
    </div>
  )
}
