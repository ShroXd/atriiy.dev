'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function AnimatedLink({ href, children }: AnimatedLinkProps) {
  const isExternal = !href.startsWith('/') && !href.startsWith('#')
  const isHash = href.startsWith('#')

  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : { className: 'no-underline' }

  const Component = isHash ? 'a' : Link

  return (
    <motion.span className='relative inline-block' whileTap={{ scale: 0.98 }}>
      <Component
        href={href}
        className='group relative inline-block font-semibold text-[var(--color-heading)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4 transition-colors duration-300 ease-out hover:text-[var(--color-accent)]'
        {...linkProps}
      >
        {children}
        <span className='absolute bottom-0 left-1/2 h-[1px] w-0' />
      </Component>
    </motion.span>
  )
}
