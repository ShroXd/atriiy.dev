import { formatDate } from 'app/blog/utils'
import type { MemoEntry } from 'app/memos/utils'

import { CustomMDX } from './mdx'

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
    <div className='flex flex-col'>
      {sorted.map((entry, idx) => (
        <div
          key={entry.slug}
          className={`py-6 ${idx !== 0 ? 'border-t border-[var(--color-surface-border)]' : ''}`}
        >
          <div className='mb-3 flex items-center gap-2'>
            <img
              src='https://github.com/ShroXd.png'
              alt='Atriiy'
              className='h-6 w-6 rounded-full object-cover'
            />
            <span className='font-montserrat text-xs font-semibold text-[var(--color-heading)]'>
              Atriiy
            </span>
            <span className='text-[var(--color-subtle)]'>·</span>
            <span className='font-mono text-xs text-[var(--color-subtle)]'>
              {formatDate(entry.metadata.publishedAt)}
            </span>
          </div>

          <div className='prose prose-sm max-w-none [&_p]:text-[var(--color-body)] [&_p]:leading-relaxed [&_em]:text-[var(--color-subtle)] [&_strong]:text-[var(--color-heading)]'>
            <CustomMDX
              source={entry.content}
              frontmatter={entry.metadata}
              markFirstParagraph={false}
              showTOC={false}
            />
          </div>

          {entry.metadata.tags && entry.metadata.tags.length > 0 && (
            <div className='mt-3 flex flex-wrap gap-1.5'>
              {entry.metadata.tags.map(tag => (
                <span
                  key={`${entry.slug}-${tag}`}
                  className='font-mono text-[11px] text-[var(--color-subtle)]'
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
