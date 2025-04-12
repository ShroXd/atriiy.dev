'use client'

import { ReactNode } from 'react'

import { formatDate } from 'app/lib/date'
import { motion } from 'framer-motion'

import BackLink from './BackLink'
import Comments from './Comments'
import FadeIn from './FadeIn'

interface BlogContentProps {
  title: string
  publishedAt: string
  isDraft?: boolean
  children: ReactNode
}

export default function BlogContent({
  title,
  publishedAt,
  isDraft = false,
  children,
}: BlogContentProps) {
  return (
    <section>
      <div className='flex items-center'>
        <FadeIn delay={0.1}>
          {/* Can we try better shiny animation from Twitter? */}
          <h1 className='font-montserrat text-2xl font-semibold tracking-tighter whitespace-pre-wrap break-words'>
            {isDraft ? (
              <motion.span
                className='inline-block bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 bg-clip-text text-transparent'
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
                {title}
              </motion.span>
            ) : (
              <>{title}</>
            )}
          </h1>
        </FadeIn>
        {isDraft && (
          <motion.span
            className='ml-2 text-2xl'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -3, 0],
              rotate: [0, -5, 0, 5, 0],
            }}
            transition={{
              opacity: {
                duration: 0.3,
                delay: 0.1,
              },
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
        )}
      </div>

      <FadeIn delay={0.2}>
        <div className='mt-2 mb-8 flex items-center justify-between text-sm'>
          <span className='text-sm text-neutral-600 dark:text-neutral-400'>
            {formatDate(publishedAt)}
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        {isDraft ? (
          <p className='prose'>
            Stay tuned. I promise I'm working on it... eventually.
          </p>
        ) : (
          <article className='prose'>{children}</article>
        )}
      </FadeIn>

      <FadeIn delay={0.35}>
        <hr className='my-12 border-t border-neutral-200 dark:border-neutral-700' />
      </FadeIn>

      <FadeIn delay={0.4}>{!isDraft && <Comments />}</FadeIn>

      <FadeIn delay={0.5}>
        <div className='mt-8 mb-4'>
          <BackLink />
        </div>
      </FadeIn>
    </section>
  )
}
