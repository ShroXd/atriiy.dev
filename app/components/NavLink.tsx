'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className='relative m-1 flex py-1 px-2 align-middle transition-all first:ml-0'
    >
      <motion.span
        className={`relative z-10 ${
          isActive
            ? 'text-neutral-800 dark:text-neutral-200'
            : 'text-neutral-600 dark:text-neutral-400'
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      {isActive && (
        <motion.div
          className='absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-800'
          layoutId='navbar-active'
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
          }}
        />
      )}
    </Link>
  )
}
