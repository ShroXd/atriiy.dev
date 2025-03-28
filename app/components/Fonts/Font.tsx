'use client'

import React from 'react'

import { motion } from 'framer-motion'

interface FontProps {
  children: React.ReactNode
  name: string
  description?: string
  fontFamily: string
}

const Font: React.FC<FontProps> = ({
  children,
  name,
  description,
  fontFamily,
}) => {
  return (
    <motion.span
      className='font-display-wrapper inline-flex items-baseline'
      whileHover={{
        color: 'rgb(60,60,50)',
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        style={{ fontFamily }}
        className='text-[rgb(80,80,65)]'
        whileHover={{
          scale: 1.015,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      <motion.span
        className='font-name ml-1.5 text-xs text-[rgb(140,140,120)]'
        variants={{
          hover: { opacity: 1 },
          initial: { opacity: 0.7 },
        }}
        initial='initial'
        whileHover='hover'
        transition={{ duration: 0.2 }}
      >
        ({name})
      </motion.span>
    </motion.span>
  )
}

export default Font
