'use client'

import { ReactNode } from 'react'

import { formatDate } from 'app/lib/date'
import { motion } from 'framer-motion'

import BackLink from './BackLink'
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
      <FadeIn delay={0.1}>
        <h1 className='title font-montserrat text-2xl font-semibold tracking-tighter'>
          {title}
          {isDraft && (
            <span className='ml-2' title='Work in Progress'>
              🚧
            </span>
          )}
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className='mt-2 mb-8 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {formatDate(publishedAt)}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        {isDraft ? (
          <p className='prose'>Work in progress, stay tuned!</p>
        ) : (
          <article className='prose font-crimson'>{children}</article>
        )}
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className='mt-8 mb-4'>
          <BackLink />
        </div>
      </FadeIn>
    </section>
  )
}
