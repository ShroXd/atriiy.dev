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
      className='font-maple-mono font-medium rounded bg-gray-100 px-1 py-0.5 text-xs'
      {...props}
    />
  )
}

// Reuse CustomLink but with tooltip-friendly styling
function TooltipLink(props) {
  return (
    <AnimatedLink
      {...props}
      className='text-blue-600 underline hover:text-blue-800 text-sm'
      target='_blank'
      rel='noopener noreferrer'
    />
  )
}

// Tooltip-friendly strong component
function TooltipStrong({ children }) {
  return (
    <strong className='font-bold text-sm' style={{ fontWeight: 700 }}>
      {children}
    </strong>
  )
}

// Tooltip-friendly paragraph component
function TooltipParagraph({ children, ...props }) {
  return (
    <p className='mb-2 last:mb-0 text-sm leading-relaxed' {...props}>
      {children}
    </p>
  )
}

// Tooltip-friendly heading components
function createTooltipHeading(level) {
  const Heading = ({ children }) => {
    const className = level === 1
      ? 'text-base font-bold mb-2'
      : level === 2
      ? 'text-sm font-semibold mb-1'
      : 'text-sm font-medium mb-1'

    return React.createElement(`h${level}`, { className }, children)
  }
  Heading.displayName = `TooltipHeading${level}`
  return Heading
}

// Tooltip-friendly list components
function TooltipUl({ children }) {
  return <ul className='ml-4 list-disc space-y-1 mb-2'>{children}</ul>
}

function TooltipOl({ children }) {
  return <ol className='ml-4 list-decimal space-y-1 mb-2'>{children}</ol>
}

function TooltipLi({ children }) {
  return <li className='text-sm'>{children}</li>
}

// Tooltip-friendly blockquote
function TooltipBlockquote({ children }) {
  return (
    <blockquote className='border-l-3 border-gray-300 pl-3 italic text-gray-600 text-sm mb-2'>
      {children}
    </blockquote>
  )
}

// Tooltip-friendly pre component
function TooltipPre({ children }) {
  return (
    <pre className='overflow-x-auto rounded bg-gray-900 text-white p-2 text-xs mb-2 max-w-full'>
      {children}
    </pre>
  )
}

// Tooltip-friendly emphasis
function TooltipEm({ children }) {
  return <em className='italic text-sm'>{children}</em>
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
    <div className='prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'>
      <MDXRemote {...source} components={tooltipComponents} />
    </div>
  )
}

export default TooltipMDX
