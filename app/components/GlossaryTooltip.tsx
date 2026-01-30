'use client'

import * as HoverCard from '@radix-ui/react-hover-card'
import { motion } from 'framer-motion'

import type {
  GlossaryData,
  GlossaryEntry,
  GlossaryTooltipContent,
  GlossaryTooltipProps,
} from '../../types/glossary'
import glossaryData from '../lib/glossary.json'

export default function GlossaryTooltip({
  term,
  children,
}: GlossaryTooltipProps) {
  const glossary = glossaryData as GlossaryData
  const entry = glossary[term]

  if (!entry) {
    // If term not found in glossary, render children as-is or just the term
    return <span>{children || term}</span>
  }

  const getTooltipContent = (): GlossaryTooltipContent => {
    if (typeof entry === 'string') {
      return {
        title: term,
        description: entry,
      }
    }
    return entry
  }

  const { title, description } = getTooltipContent()

  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <span className='relative cursor-help border-b-2 border-dotted border-[#c5c5b8] bg-gradient-to-b from-transparent to-[#f8f8f0]/30 transition-all duration-200 hover:border-[#a8a89d] hover:to-[#f2f2e3]/50'>
          {children || term}
        </span>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          align='center'
          side='bottom'
          sideOffset={8}
          alignOffset={0}
          avoidCollisions={true}
          collisionPadding={16}
          className='data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-50 will-change-[transform,opacity]'
          asChild
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: -8,
            }}
            transition={{
              duration: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className='w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-[#e5e5d8] bg-gradient-to-br from-[#fafaf5] to-[#f5f5ef] p-5 ring-1 shadow-lg ring-black/5'
          >
            <div className='relative'>
              {typeof entry === 'object' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05,
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className='mb-3 flex items-center gap-2'
                >
                  <div className='h-1 w-1 rounded-full bg-[rgb(100,100,85)]'></div>
                  <span className='text-xs font-semibold uppercase tracking-wide text-[rgb(100,100,85)]'>
                    {title}
                  </span>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='text-sm leading-relaxed text-[rgb(74,74,64)]'
              >
                {description}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='mt-3 h-px w-full bg-gradient-to-r from-[#e5e5d8] via-[#d0d0c0] to-transparent'
              />
            </div>
          </motion.div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
