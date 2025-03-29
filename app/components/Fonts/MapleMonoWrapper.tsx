'use client'

import React from 'react'

import Font from './Font'

interface MapleMonoProps {
  children: React.ReactNode
  description?: string
}

const MapleMonoWrapper: React.FC<MapleMonoProps> = ({
  children,
  description,
}) => {
  return (
    <Font
      name='Maple Mono'
      description={description || 'Code & monospaced text'}
      fontFamily='var(--font-maple-mono)'
    >
      {children}
    </Font>
  )
}

export default MapleMonoWrapper
