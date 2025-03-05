'use client'

import { useEffect, useRef, useState } from 'react'

export function Mermaid({ children }: { children: string }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const mermaidRef = useRef<any>(null)

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    setLoaded(false)
    if (mermaidRef.current) {
      mermaidRef.current = null
    }

    import('mermaid').then(m => {
      mermaidRef.current = m.default
      mermaidRef.current.initialize({
        startOnLoad: true,
        theme: isDarkMode ? 'default' : 'default',
        securityLevel: 'loose',
      })
      setLoaded(true)
    })
  }, [isDarkMode])

  useEffect(() => {
    if (loaded && ref.current && children && mermaidRef.current) {
      mermaidRef.current
        .render('mermaid-svg', children)
        .then(({ svg }: { svg: string }) => {
          setSvg(svg)
        })
        .catch(console.error)
    }
  }, [children, loaded])

  return (
    <div
      ref={ref}
      className='flex justify-center'
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
