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
    <motion.div
      className='relative m-1 py-1 px-2'
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={`relative inline-block transition-colors duration-200 ${
          isActive
            ? 'border-b border-neutral-800 text-neutral-800'
            : 'text-neutral-600 hover:text-neutral-800'
        }`}
      >
        {children}
      </Link>
    </motion.div>
  )
}
