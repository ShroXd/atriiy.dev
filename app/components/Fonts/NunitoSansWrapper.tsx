'use client'

import React from 'react'

import Font from './Font'

interface NunitoSansWrapperProps {
  children: React.ReactNode
  description?: string
}

const NunitoSansWrapper: React.FC<NunitoSansWrapperProps> = ({
  children,
  description,
}) => {
  return (
    <Font
      name='Nunito Sans'
      description={description || 'UI elements — buttons, navigation, links'}
      fontFamily='var(--font-nunito-sans)'
    >
      {children}
    </Font>
  )
}

export default NunitoSansWrapper
