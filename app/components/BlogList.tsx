'use client'

import { formatDate } from 'app/lib/date'
import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
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

export function BlogList({ posts }: BlogListProps) {
  return (
    <motion.div variants={container} initial='hidden' animate='show'>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map(post => (
          <motion.div
            key={post.slug}
            variants={item}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Link
              className='mb-4 flex flex-col space-y-1'
              href={`/blog/${post.slug}`}
            >
              <div className='space-x-0 md:flex-row md:space-x-2'>
                <p className='font-montserrat tracking-tight text-neutral-600 transition-all duration-200 ease-[linear(0,_-0.01_4.8%,_-0.044_9.4%,_-0.226_23.1%,_-0.271_27.7%,_-0.28_30.1%,_-0.276_32.4%,_-0.227_36.6%,_-0.108_40.8%,_0.083_44.7%,_0.76_53%,_1.006_56.9%,_1.175_61.2%,_1.229_63.5%,_1.264_65.9%,_1.28_69.3%,_1.265_73.1%,_1.224_77.1%,_1.044_90.6%,_1.01_95.2%,_1)] hover:-translate-y-0.5 hover:text-neutral-800'>
                  {post.metadata.title}
                  {post.metadata.draft && (
                    <span className='ml-2' title='Work in Progress'>
                      🚧
                    </span>
                  )}
                  <span className='ml-6 text-xs tabular-nums text-neutral-600'>
                    {formatDate(post.metadata.publishedAt)}
                  </span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
    </motion.div>
  )
}
