'use client'

import { useEffect, useRef, useState } from 'react'

let mermaid: any

export function Mermaid({ children }: { children: string }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    import('mermaid').then(m => {
      mermaid = m.default
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
      })
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (loaded && ref.current && children) {
      mermaid
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
