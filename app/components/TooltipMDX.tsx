'use client'

import React from 'react'

import { MDXRemote } from 'next-mdx-remote'
import { highlight } from 'sugar-high'

import AnimatedLink from './AnimatedLink'

// Reuse the existing Code component but with tooltip-friendly styling
function TooltipCode({ children, ...props }) {
  let codeHTML = highlight(children)
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className='font-maple-mono py-0.5 px-1.5 text-[0.85rem] font-medium text-[var(--color-heading)]'
      {...props}
    />
  )
}

// Reuse CustomLink but with tooltip-friendly styling
function TooltipLink(props) {
  return <AnimatedLink {...props} target='_blank' rel='noopener noreferrer' />
}

// Tooltip-friendly strong component
function TooltipStrong({ children }) {
  return (
    <strong
      className='font-semibold text-[var(--color-heading)]'
      style={{ fontWeight: 600 }}
    >
      {children}
    </strong>
  )
}

// Tooltip-friendly paragraph component
function TooltipParagraph({ children, ...props }) {
  return (
    <p
      className='font-nunito-sans mb-2 text-[0.95rem] leading-relaxed text-[var(--color-body)] last:mb-0'
      {...props}
    >
      {children}
    </p>
  )
}

// Tooltip-friendly heading components
function createTooltipHeading(level) {
  const Heading = ({ children }) => {
    const className =
      level === 1 ? 'text-base' : level === 2 ? 'text-[1rem]' : 'text-[0.95rem]'

    return React.createElement(
      `h${level}`,
      {
        className: `${className} mb-1 font-montserrat font-semibold tracking-tight text-[var(--color-heading)]`,
      },
      children
    )
  }
  Heading.displayName = `TooltipHeading${level}`
  return Heading
}

// Tooltip-friendly list components
function TooltipUl({ children }) {
  return (
    <ul className='mb-2 ml-4 list-disc space-y-1 text-[0.95rem] text-[var(--color-body)]'>
      {children}
    </ul>
  )
}

function TooltipOl({ children }) {
  return (
    <ol className='mb-2 ml-4 list-decimal space-y-1 text-[0.95rem] text-[var(--color-body)]'>
      {children}
    </ol>
  )
}

function TooltipLi({ children }) {
  return (
    <li className='font-nunito-sans text-[0.95rem] leading-relaxed text-[var(--color-body)]'>
      {children}
    </li>
  )
}

// Tooltip-friendly blockquote
function TooltipBlockquote({ children }) {
  return (
    <blockquote className='font-nunito-sans mb-2 rounded-md border-l-2 border-[var(--color-surface-border)] bg-[var(--color-surface)]/70 py-2 pr-2 pl-3 text-[0.92rem] italic text-[var(--color-subtle)]'>
      {children}
    </blockquote>
  )
}

// Tooltip-friendly pre component
function TooltipPre({ children }) {
  return (
    <pre className='font-maple-mono mb-2 max-w-full overflow-x-auto rounded-xl border-2 border-[var(--color-surface-border)] bg-[var(--color-surface)] p-3 text-[0.85rem] text-[var(--color-heading)] shadow-[0_4px_15px_rgba(32,35,41,0.08)]'>
      {children}
    </pre>
  )
}

// Tooltip-friendly emphasis
function TooltipEm({ children }) {
  return (
    <em className='font-nunito-sans text-[0.95rem] italic text-[var(--color-subtle)]'>
      {children}
    </em>
  )
}

// Components optimized for tooltip rendering
const tooltipComponents = {
  h1: createTooltipHeading(1),
  h2: createTooltipHeading(2),
  h3: createTooltipHeading(3),
  h4: createTooltipHeading(4),
  h5: createTooltipHeading(5),
  h6: createTooltipHeading(6),
  p: TooltipParagraph,
  a: TooltipLink,
  strong: TooltipStrong,
  em: TooltipEm,
  code: TooltipCode,
  pre: TooltipPre,
  ul: TooltipUl,
  ol: TooltipOl,
  li: TooltipLi,
  blockquote: TooltipBlockquote,
}

interface TooltipMDXProps {
  source: any // Serialized MDX source
}

/**
 * Specialized MDX component for rendering markdown content in tooltips.
 * Reuses the same components and styling as the main article renderer
 * but with tooltip-appropriate sizing and spacing.
 */
export function TooltipMDX({ source }: TooltipMDXProps) {
  if (!source) {
    return <span className='text-xs text-red-600'>Failed to load content</span>
  }

  return (
    <div className='prose prose-sm font-nunito-sans max-w-none text-[var(--color-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'>
      <MDXRemote {...source} components={tooltipComponents} />
    </div>
  )
}

export default TooltipMDX
