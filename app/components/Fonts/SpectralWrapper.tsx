'use client'

import React from 'react'

import Font from './Font'

interface SpectralWrapperProps {
  children: React.ReactNode
  description?: string
}

const SpectralWrapper: React.FC<SpectralWrapperProps> = ({
  children,
  description,
}) => {
  return (
    <Font
      name='Spectral'
      description={description || 'Body text'}
      fontFamily='var(--font-spectral)'
    >
      {children}
    </Font>
  )
}

export default SpectralWrapper
