'use client'

import React, { useEffect, useState } from 'react'

import Giscus from '@giscus/react'

export default function Comments() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Giscus
      id='comments'
      repo='ShroXd/atriiy.dev'
      repoId='R_kgDON9nvqg'
      category='General'
      categoryId='DIC_kwDON9nvqs4CoX8n'
      mapping='pathname'
      strict='0'
      reactionsEnabled='1'
      emitMetadata='1'
      inputPosition='top'
      theme='light_tritanopia'
      lang='en'
      loading='lazy'
    />
  )
}
