'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const LIMIT = 8

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

interface Post {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    draft?: boolean
  }
}

function formatHomeDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
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
          backgroundPosition: { repeat: Infinity, duration: 3, ease: 'linear' },
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

export function HomeBlogList({ posts }: { posts: Post[] }) {
  const sorted = [...posts]
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, LIMIT)

  return (
    <div>
      <motion.ul variants={container} initial='hidden' animate='show'>
        {sorted.map(post => (
          <motion.li key={post.slug} variants={item}>
            <Link
              href={`/blog/${post.slug}`}
              className='group flex flex-col py-3'
            >
              <span className='font-montserrat font-medium tracking-tight text-[var(--color-heading)] transition-colors duration-200 group-hover:text-[var(--color-link-hover)]'>
                {post.metadata.draft ? (
                  <DraftTitle title={post.metadata.title} />
                ) : (
                  post.metadata.title
                )}
              </span>
              <time
                dateTime={post.metadata.publishedAt}
                className='mt-1 font-mono text-xs tabular-nums text-neutral-400 dark:text-neutral-500'
              >
                {formatHomeDate(post.metadata.publishedAt)}
              </time>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className='mt-5'
      >
        <Link
          href='/blog'
          className='group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:text-[var(--color-link-hover)] dark:text-neutral-500'
        >
          <span>All posts</span>
          <span className='translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5'>
            →
          </span>
        </Link>
      </motion.div>
    </div>
  )
}
