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
            <motion.div
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.995 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              <Link
                className='mb-4 flex flex-col space-y-1'
                href={`/blog/${post.slug}`}
              >
                <div className='group space-x-0 md:flex-row md:space-x-2'>
                  <span className='font-montserrat tracking-tight text-neutral-600 transition-all duration-200 group-hover:text-neutral-800'>
                    {post.metadata.draft ? (
                      <motion.div className='inline-flex items-center'>
                        <motion.span
                          className='inline-block bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 bg-clip-text font-medium text-transparent'
                          animate={{
                            opacity: [0.8, 1, 0.8],
                            backgroundPosition: ['0%', '100%', '0%'],
                          }}
                          transition={{
                            opacity: {
                              repeat: Infinity,
                              duration: 3,
                              ease: 'easeInOut',
                            },
                            backgroundPosition: {
                              repeat: Infinity,
                              duration: 3,
                              ease: 'linear',
                            },
                          }}
                        >
                          {post.metadata.title}
                        </motion.span>
                        <motion.span
                          className='ml-2'
                          animate={{
                            y: [0, -3, 0],
                            rotate: [0, -5, 0, 5, 0],
                          }}
                          transition={{
                            y: {
                              repeat: Infinity,
                              duration: 1.5,
                              ease: 'easeInOut',
                            },
                            rotate: {
                              repeat: Infinity,
                              duration: 2,
                              ease: 'easeInOut',
                            },
                          }}
                          title='Work in Progress'
                        >
                          🚧
                        </motion.span>
                      </motion.div>
                    ) : (
                      <span className='inline-block'>
                        {post.metadata.title}
                      </span>
                    )}
                    <span className='ml-6 text-xs tabular-nums text-neutral-500 transition-colors duration-200 group-hover:text-neutral-600'>
                      {formatDate(post.metadata.publishedAt)}
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        ))}
    </motion.div>
  )
}
