'use client'

import * as HoverCard from '@radix-ui/react-hover-card'
import { motion } from 'framer-motion'

import type {
  GlossaryData,
  GlossaryTooltipContent,
  GlossaryTooltipProps,
} from '../../types/glossary'
import glossaryData from '../blog/glossary/glossary.json'
import {
  useGlossaryMarkdown,
  useIsGlossaryTermPreloaded,
} from './GlossaryClientProvider'
import TooltipMDX from './TooltipMDX'

export default function GlossaryTooltip({
  term,
  children,
  isMarkdownFile = false,
}: GlossaryTooltipProps) {
  const glossary = glossaryData as GlossaryData
  const entry = glossary[term]

  // Get preloaded markdown content if this is a markdown file
  const markdownContent = useGlossaryMarkdown(term)
  const isPreloaded = useIsGlossaryTermPreloaded(term)

  // For markdown files, check if we have content
  if (isMarkdownFile) {
    if (!isPreloaded || !markdownContent) {
      // If not preloaded or no content, render as plain text
      return <span>{children || term}</span>
    }
  } else if (!entry) {
    // If term not found in JSON glossary, render as plain text
    return <span>{children || term}</span>
  }

  const getTooltipContent = (): GlossaryTooltipContent | null => {
    if (isMarkdownFile) {
      return {
        title: term,
        description: '', // Description will be handled by MDX rendering
      }
    }

    if (typeof entry === 'string') {
      return {
        title: term,
        description: entry,
      }
    }
    return entry
  }

  const tooltipContent = getTooltipContent()

  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <motion.span
          className='group inline-flex cursor-help items-baseline gap-0.5'
          whileHover='hover'
          initial='initial'
        >
          <span className='rounded-sm bg-[#f5f3e8] py-0.5 px-1 text-[#5a5a4d] underline decoration-[#c5b89a] decoration-wavy decoration-from-font underline-offset-3 transition-all duration-200 group-hover:bg-[#ebe7d6] group-hover:text-[#4a4a3d] group-hover:decoration-[#a89870]'>
            {children || term}
          </span>
          <motion.span
            className='inline-block text-[15px] text-[#9a8a6a]'
            variants={{
              initial: {
                scale: 1,
                rotate: 0,
                y: 0,
              },
              hover: {
                scale: [1, 1.3, 1.15],
                rotate: [0, -12, 12, -8, 8, 0],
                y: [0, -2, 0],
                color: '#6a5a3a',
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  rotate: {
                    duration: 0.6,
                    ease: 'easeInOut',
                  },
                },
              },
            }}
          >
            {isMarkdownFile ? '📝' : '✨'}
          </motion.span>
        </motion.span>
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
            className={`tooltip-card ${
              isMarkdownFile
                ? 'h-80 w-[30rem] max-w-[calc(100vw-1rem)] overflow-y-auto'
                : 'w-[22rem] max-w-[calc(100vw-2rem)]'
            } relative ring-1 ring-black/5`}
          >
            <div className='relative flex flex-col gap-3'>
              {tooltipContent?.title && (
                <>
                  <p className='text-lg font-semibold uppercase tracking-[0.35em] text-[var(--color-subtle)]'>
                    {tooltipContent.title}
                  </p>
                  <div className='pointer-events-none inset-x-6 top-3 h-px rounded-full bg-gradient-to-r from-[var(--color-body)] to-[var(--color-accent-soft)] opacity-80' />
                </>
              )}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='font-nunito-sans text-[0.95rem] leading-relaxed text-[var(--color-body)]'
              >
                {isMarkdownFile && markdownContent ? (
                  <TooltipMDX source={markdownContent} />
                ) : (
                  <p className='text-[0.95rem] leading-relaxed text-[var(--color-body)]'>
                    {tooltipContent?.description}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
