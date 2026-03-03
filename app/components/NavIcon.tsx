'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

export function NavIcon() {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link href='/' aria-label='Home'>
      <Image
        src='/icon-animated.svg'
        alt='Atriiy'
        width={96}
        height={96}
        priority
        onLoad={() => setLoaded(true)}
        className={`-ml-3.5 rounded-full transition-all duration-1000 ease-out hover:scale-110 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </Link>
  )
}
