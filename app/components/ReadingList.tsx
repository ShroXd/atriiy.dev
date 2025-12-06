import type { ReadingEntry, ReadingStatus } from 'app/reading/utils'

import { CustomMDX } from './mdx'

const statusTone: Record<ReadingStatus, string> = {
  Reading: 'bg-[#e4ddcc] text-[#3f3b34]',
  Finished: 'bg-[#dcd6c8] text-[#3a352d]',
  Revisiting: 'bg-[#e7e1d2] text-[#3f3a32]',
  Queued: 'bg-[#ece6d7] text-[#413c34]',
}

const cardPalette = ['#f7f4ec', '#f5f2ea', '#f8f5ee', '#f4f1e9']

interface ReadingListProps {
  entries: ReadingEntry[]
}

const fallbackCover =
  'https://cdnagesdb.com/images/fictionimages/2DFA9C457C196E87E61A84B547510CEF.webp'

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
          const bg = cardPalette[idx % cardPalette.length]
          const coverSrc = entry.metadata.cover || fallbackCover
          return (
            <article
              key={entry.slug}
              className='group relative mb-10 inline-block w-full overflow-hidden rounded-3xl border border-[#d9d1c2] bg-[#f8f5ee] shadow-[0_14px_28px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:-translate-y-1'
              style={{
                breakInside: 'avoid',
                backgroundColor: bg,
              }}
            >
              <div className='relative overflow-hidden'>
                <div
                  className='h-[290px] w-full bg-cover bg-center'
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(247,245,236,0.15), rgba(20,17,12,0.08)), url(${coverSrc})`,
                  }}
                />
                <div className='absolute left-5 top-5'>
                  <span
                    className={`${statusTone[entry.metadata.status]} inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]`}
                    aria-label={`${entry.metadata.status} status`}
                  >
                    {entry.metadata.status}
                  </span>
                </div>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(247,245,236,0.85)]' />
              </div>

              <div className='px-5 pb-6 pt-5'>
                <header className='mb-3 space-y-1.5'>
                  <h2 className='font-montserrat text-lg font-semibold tracking-tight text-neutral-900'>
                    {entry.metadata.title}
                  </h2>
                  <p className='text-sm text-neutral-600'>
                    {entry.metadata.author} · {entry.metadata.year}
                  </p>
                </header>

                <div className='space-y-3'>
                  <div className='prose prose-sm max-w-none text-[rgb(74,74,64)]'>
                    <CustomMDX
                      source={entry.content}
                      frontmatter={entry.metadata}
                      markFirstParagraph={false}
                      showTOC={false}
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
              </div>
            </article>
          )
        })}
    </div>
  )
}
