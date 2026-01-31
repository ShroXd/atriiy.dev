import { ReactNode } from 'react'

import { serialize } from 'next-mdx-remote/serialize'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { preloadGlossaryMarkdown } from '../blog/glossary/utils'
import { GlossaryClientProvider } from './GlossaryClientProvider'

interface GlossaryProviderProps {
  children: ReactNode
  source?: string
}

/**
 * Server component that extracts glossary terms from MDX source and preloads markdown content
 */
export default async function GlossaryProvider({
  children,
  source = '',
}: GlossaryProviderProps) {
  // Extract glossary markdown references from the source
  const markdownTerms = extractMarkdownGlossaryTerms(source)

  // Preload and serialize markdown content server-side
  const preloadedMarkdown: Record<string, any> = {}

  if (markdownTerms.length > 0) {
    const rawMarkdown = await preloadGlossaryMarkdown(markdownTerms)

    // Serialize each markdown file using the same plugins as main MDX
    for (const [term, content] of Object.entries(rawMarkdown)) {
      if (content) {
        try {
          preloadedMarkdown[term] = await serialize(content, {
            mdxOptions: {
              remarkPlugins: [remarkMath, remarkGfm],
              rehypePlugins: [
                [rehypeKatex, { strict: false, trust: true }],
                rehypeSlug,
              ],
            },
          })
        } catch (error) {
          console.error(
            `Error serializing glossary markdown for ${term}:`,
            error
          )
          preloadedMarkdown[term] = null
        }
      } else {
        preloadedMarkdown[term] = null
      }
    }
  }

  return (
    <GlossaryClientProvider preloadedMarkdown={preloadedMarkdown}>
      {children}
    </GlossaryClientProvider>
  )
}

/**
 * Extract glossary terms that reference markdown files from MDX source
 * Looks for patterns like [text](abbr:term.md)
 */
function extractMarkdownGlossaryTerms(source: string): string[] {
  const regex = /\[([^\]]+)\]\(abbr:([^)]+)\.md\)/g
  const terms = new Set<string>()

  let match
  while ((match = regex.exec(source)) !== null) {
    const term = match[2] // The term part before .md
    terms.add(term)
  }

  return Array.from(terms)
}
