'use client'

import { motion } from 'framer-motion'
import { BrandIcon } from './BrandIcon'
import type { ContributionFile, PRStatus } from 'app/contribution/utils'

// Octicon git-pull-request
function PullRequestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 16 16' fill='currentColor' className={className} aria-hidden>
      <path d='M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z' />
    </svg>
  )
}

const statusStyle: Record<PRStatus, string> = {
  merged: 'bg-purple-50 border-purple-200 text-purple-600',
  open: 'bg-green-50 border-green-200 text-green-600',
  closed: 'bg-neutral-100 border-neutral-200 text-neutral-500',
  draft: 'bg-amber-50 border-amber-200 text-amber-600',
}

interface ContributionListProps {
  data: ContributionFile[]
}

export function ContributionList({ data }: ContributionListProps) {
  const sorted = [...data].sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <div className='space-y-10'>
      {sorted.map(file => (
        <div key={file.year}>
          <p className='mb-6 font-mono text-xs text-neutral-400'>{file.year}</p>
          <div className='space-y-7'>
            {file.groups.map(group => (
              <div key={group.repo}>
                <a
                  href={`https://github.com/${group.repo}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-[var(--color-subtle)] transition-colors hover:text-[var(--color-accent)]'
                >
                  <BrandIcon name='siGithub' className='h-3 w-3' />
                  {group.repo}
                </a>
                <ul className='mt-3 flex flex-col items-start gap-2'>
                  {group.prs.map((pr, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.04 }}
                      className='flex items-center gap-2.5'
                    >
                      <PullRequestIcon className='h-3.5 w-3.5 shrink-0 text-neutral-400' />
                      <a
                        href={pr.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-[var(--color-body)] transition-colors hover:text-[var(--color-link-hover)]'
                      >
                        {pr.title}
                      </a>
                      {pr.status && (
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyle[pr.status]}`}>
                          {pr.status}
                        </span>
                      )}
                    </motion.li>
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
