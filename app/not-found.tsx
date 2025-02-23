'use client'

import { useEffect, useState } from 'react'

import FuzzyText from './components/FuzzyText/FuzzyText'

export default function NotFound() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)

    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <section>
      <div className='mb-12'>
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.4}
          enableHover={true}
          color={isDark ? 'white' : 'black'}
        >
          404
        </FuzzyText>
      </div>
      <p className='mb-4'>The page you are looking for does not exist.</p>
    </section>
  )
}
