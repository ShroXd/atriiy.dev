import type { ContributionFile, PRStatus } from 'app/contribution/utils'

const statusLabel: Record<PRStatus, string> = {
  merged: 'merged',
  open: 'open',
  closed: 'closed',
  draft: 'draft',
}

const statusStyle: Record<PRStatus, string> = {
  merged: 'bg-purple-100 text-purple-700 border-purple-200',
  open: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-neutral-200 text-neutral-500 border-neutral-300',
  draft: 'bg-amber-100 text-amber-700 border-amber-200',
}

interface ContributionListProps {
  data: ContributionFile[]
}

export function ContributionList({ data }: ContributionListProps) {
  const sorted = [...data].sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <div className='space-y-16'>
      {sorted.map(file => (
        <div key={file.year} className='relative space-y-10'>
          {/* Year label */}
          <div className='flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-neutral-500'>
            <span className='rounded-full bg-neutral-200/70 py-1 px-3 font-semibold'>
              {file.year}
            </span>
            <span className='h-px flex-1 bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent' />
          </div>

          {/* Repo groups */}
          <div className='relative space-y-10 pl-10'>
            <div className='pointer-events-none absolute top-2 bottom-0 left-3 w-px bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent' />
            {file.groups.map((group, idx) => (
              <div key={group.repo} className='relative' style={{ zIndex: file.groups.length - idx }}>
                {/* Timeline dot */}
                <div className='absolute top-1.5 -left-7 flex items-center justify-center'>
                  <span className='h-3 w-3 rounded-full border border-neutral-500 bg-[var(--color-base)] shadow-[0_0_0_6px_rgba(242,242,227,0.9)] dark:shadow-[0_0_0_6px_rgba(30,30,27,0.9)]' />
                </div>

                {/* Repo name */}
                <div className='mb-4 flex items-baseline gap-2'>
                  <a
                    href={`https://github.com/${group.repo}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-montserrat text-sm font-semibold tracking-tight text-[var(--color-heading)] transition-colors duration-200 hover:text-[var(--color-accent)]'
                  >
                    {group.repo}
                  </a>
                  <span className='text-xs text-neutral-400'>
                    {group.prs.length} {group.prs.length === 1 ? 'PR' : 'PRs'}
                  </span>
                </div>

                {/* PR list */}
                <ul className='space-y-2'>
                  {group.prs.map((pr, i) => (
                    <li key={i} className='flex items-start gap-3'>
                      <svg
                        className='mt-1 h-4 w-4 shrink-0 text-neutral-400'
                        viewBox='0 0 16 16'
                        fill='currentColor'
                      >
                        <path d='M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z' />
                      </svg>
                      <div className='flex flex-1 flex-wrap items-baseline gap-2'>
                        <a
                          href={pr.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm text-[var(--color-body)] underline decoration-neutral-300 underline-offset-2 transition-colors duration-200 hover:text-[var(--color-link-hover)] hover:decoration-[var(--color-link-hover)]'
                        >
                          {pr.title}
                        </a>
                        {pr.status && (
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyle[pr.status]}`}
                          >
                            {statusLabel[pr.status]}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
