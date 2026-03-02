'use client'

import React from 'react'

import Font from './Font'

interface JetBrainsMonoProps {
  children: React.ReactNode
  description?: string
}

const JetBrainsMonoWrapper: React.FC<JetBrainsMonoProps> = ({
  children,
  description,
}) => {
  return (
    <Font
      name='JetBrains Mono'
      description={description || 'Code & monospaced text'}
      fontFamily='var(--font-jetbrains-mono)'
    >
      {children}
    </Font>
  )
}

export default JetBrainsMonoWrapper
