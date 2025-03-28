'use client'

import React from 'react'

import Font from './Font'

interface MontserratWrapperProps {
  children: React.ReactNode
  description?: string
}

const MontserratWrapper: React.FC<MontserratWrapperProps> = ({
  children,
  description,
}) => {
  return (
    <Font
      name='Montserrat'
      description={description || 'Section & chapter titles — for structure'}
      fontFamily='var(--font-montserrat)'
    >
      {children}
    </Font>
  )
}

export default MontserratWrapper
