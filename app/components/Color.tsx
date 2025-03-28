'use client'

import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

interface ColorProps {
  children: string
}

const Color: React.FC<ColorProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const colorCode = children.trim()

  // Determine text color based on background color brightness
  const getBrightness = (hexColor: string): number => {
    // Remove # if present
    const hex = hexColor.replace('#', '')

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    // Calculate brightness (perceived brightness formula)
    return (r * 299 + g * 587 + b * 114) / 1000
  }

  const textColor = getBrightness(colorCode) > 128 ? '#000000' : '#ffffff'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(colorCode).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 1500)
    })
  }

  return (
    <span className='my-1 inline-flex items-center'>
      <motion.span
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className='relative mr-2 inline-flex cursor-pointer items-center rounded-md'
        style={{ height: '2rem' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={copyToClipboard}
      >
        <motion.span
          style={{
            backgroundColor: colorCode,
            width: isHovered || isCopied ? '5rem' : '2rem',
            height: '2rem',
            borderRadius: '0.375rem',
            display: 'inline-block',
            transition: 'width 0.3s ease-in-out',
            border: '1px solid rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode='wait'>
            {isHovered || isCopied ? (
              <motion.div
                className='absolute inset-0 flex items-center justify-center'
                key='expanded'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence mode='wait'>
                  {isCopied ? (
                    <motion.div
                      key='copied-container'
                      className='flex h-full w-full flex-col items-center justify-center'
                    >
                      <motion.span
                        key='colorcode-out'
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -20, opacity: 0 }}
                        exit={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className='absolute text-sm font-medium'
                        style={{ color: textColor }}
                      >
                        {colorCode}
                      </motion.span>
                      <motion.span
                        key='copied-in'
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='absolute text-sm font-bold'
                        style={{ color: textColor }}
                      >
                        Copied!
                      </motion.span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key='color-code'
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className='text-sm font-medium'
                      style={{ color: textColor }}
                    >
                      {colorCode}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key='collapsed'
                className='h-full w-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.span>
      </motion.span>

      <span className='text-sm'>{colorCode}</span>
    </span>
  )
}

export default Color
