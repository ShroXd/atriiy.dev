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
    <motion.span className='relative inline-block' whileTap={{ scale: 0.98 }}>
      <Component
        href={href}
        className={`group relative inline-block text-[#6e7554] transition-all [.table-of-contents_&]:border-0 ${className}`}
        {...linkProps}
      >
        {children}
        <span className='absolute bottom-0 left-1/2 h-[1px] w-0 bg-[#6e7554] transition-all duration-400 ease-[linear(0,_0.008_1.1%,_0.031_2.2%,_0.129_4.8%,_0.257_7.2%,_0.671_14.2%,_0.789_16.5%,_0.881_18.6%,_0.957_20.7%,_1.019_22.9%,_1.063_25.1%,_1.094_27.4%,_1.114_30.7%,_1.112_34.5%,_1.018_49.9%,_0.99_59.1%,_1)] group-hover:left-0 group-hover:w-full' />
      </Component>
    </motion.span>
  )
}
