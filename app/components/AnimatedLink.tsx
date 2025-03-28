'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function AnimatedLink({
  href,
  children,
  className = '',
}: AnimatedLinkProps) {
  const isExternal = !href.startsWith('/') && !href.startsWith('#')
  const isHash = href.startsWith('#')

  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const Component = isHash ? 'a' : Link

  return (
    <motion.span
      className='inline-block'
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Component
        href={href}
        className={`relative inline-block border-b border-[#6e7554] pb-[0.5px] text-[#6e7554] transition-all hover:border-[#6e7554] [.table-of-contents_&]:border-0 ${className}`}
        {...linkProps}
      >
        {children}
      </Component>
    </motion.span>
  )
}
