'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

interface Post {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    draft?: boolean
  }
}

interface BlogListProps {
  posts: Post[]
}

function formatListDate(dateStr: string) {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  const month = d.toLocaleDateString('en-US', { month: 'short' })
  const day = String(d.getDate()).padStart(2, '0')
  return `${year} ${month} ${day}`
}

function DraftTitle({ title }: { title: string }) {
  return (
    <motion.span className='inline-flex items-center gap-2'>
      <motion.span
        className='inline-block bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 bg-clip-text font-medium text-transparent'
        animate={{
          opacity: [0.8, 1, 0.8],
          backgroundPosition: ['0%', '100%', '0%'],
        }}
        transition={{
          opacity: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          backgroundPosition: {
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          },
        }}
      >
        {title}
      </motion.span>
      <motion.span
        animate={{ y: [0, -3, 0], rotate: [0, -5, 0, 5, 0] }}
        transition={{
          y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        title='Work in Progress'
      >
        🚧
      </motion.span>
    </motion.span>
  )
}

export function BlogList({ posts }: BlogListProps) {
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )

  return (
    <motion.ul variants={container} initial='hidden' animate='show'>
      {sorted.map(post => (
        <motion.li key={post.slug} variants={listItem}>
          <Link
            href={`/blog/${post.slug}`}
            className='group flex items-baseline gap-6 border-b border-[var(--color-surface-border)] py-3 last:border-b-0'
          >
            <time
              dateTime={post.metadata.publishedAt}
              className='w-32 shrink-0 font-mono text-xs tabular-nums text-neutral-400 dark:text-neutral-500'
            >
              {formatListDate(post.metadata.publishedAt)}
            </time>
            <span className='font-montserrat tracking-tight text-[var(--color-heading)] transition-colors duration-200 group-hover:text-[var(--color-link-hover)]'>
              {post.metadata.draft ? (
                <DraftTitle title={post.metadata.title} />
              ) : (
                post.metadata.title
              )}
            </span>
            <span className='ml-auto translate-x-0 text-sm text-[var(--color-link-hover)] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100'>
              →
            </span>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}
