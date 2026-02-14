'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const baseClasses =
    'group relative m-1 inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-offset-2 focus-visible:outline-neutral-800 hover:-translate-y-0.5'

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`${baseClasses} ${
        isActive
          ? 'bg-neutral-900/90 text-neutral-50 ring-1 ring-neutral-900/60'
          : 'text-neutral-600 ring-1 ring-transparent hover:text-neutral-900 hover:ring-neutral-900/20'
      }`}
    >
      {children}
    </Link>
  )
}
