import { formatDate } from 'app/blog/utils'
import type { MemoEntry } from 'app/memos/utils'

import { CustomMDX } from './mdx'

const cardPalette = ['#f7f4ec', '#f5f2ea', '#f8f5ee', '#f4f1e9']

interface MemosListProps {
  entries: MemoEntry[]
}

export function MemosList({ entries }: MemosListProps) {
  const sorted = [...entries].sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  return (
    <div className='columns-1 md:columns-2' style={{ columnGap: '1.5rem' }}>
      {sorted.map((entry, idx) => {
        const bg = cardPalette[idx % cardPalette.length]
        return (
          <article
            key={entry.slug}
            className='group relative mb-5 inline-block w-full overflow-hidden rounded-2xl border border-[#d9d1c2] shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)]'
            style={{
              breakInside: 'avoid',
              backgroundColor: bg,
            }}
          >
            <div className='pt-5 px-5 pb-4'>
              {/* Header row: avatar dot + date */}
              <div className='mb-3 flex items-center gap-3'>
                <img
                  src='https://github.com/ShroXd.png'
                  alt='Atriiy'
                  className='h-8 w-8 rounded-full object-cover'
                />
                <div className='flex flex-col'>
                  <span className='font-montserrat text-sm font-semibold tracking-tight text-[rgb(80,80,65)]'>
                    Atriiy
                  </span>
                  <span className='text-xs text-neutral-500'>
                    {formatDate(entry.metadata.publishedAt)}
                  </span>
                </div>
              </div>

              {/* MDX content — reuse blog prose rendering */}
              <div className='prose prose-sm max-w-none text-[rgb(74,74,64)]'>
                <CustomMDX
                  source={entry.content}
                  frontmatter={entry.metadata}
                  markFirstParagraph={false}
                  showTOC={false}
                />
              </div>

              {/* Tags */}
              {entry.metadata.tags && entry.metadata.tags.length > 0 && (
                <div className='mt-3 flex flex-wrap gap-2 border-t border-[#e5e0d0] pt-3 text-xs text-neutral-600'>
                  {entry.metadata.tags.map(tag => (
                    <span
                      key={`${entry.slug}-${tag}`}
                      className='rounded-full bg-neutral-200/60 py-1 px-2.5 font-semibold tracking-tight'
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
