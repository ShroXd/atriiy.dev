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
        <span className='cursor-help border-b border-dashed border-[#d0d0c0] transition-colors duration-200 hover:border-[rgb(80,80,65)]'>
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
            className='w-80 max-w-[calc(100vw-2rem)] rounded-lg border-2 border-[#d0d0c0] bg-[#f2f2e3] p-4 shadow-xl'
          >
            <div className='relative'>
              {typeof entry === 'object' && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.15 }}
                  className='mb-2 text-xs font-semibold uppercase tracking-wide text-[rgb(100,100,85)]'
                >
                  {title}
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.15 }}
                className='text-sm leading-relaxed text-[rgb(74,74,64)]'
              >
                {description}
              </motion.div>
            </div>
          </motion.div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
