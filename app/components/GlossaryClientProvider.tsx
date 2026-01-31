'use client'

import { ReactNode, createContext, useContext } from 'react'

interface GlossaryContextValue {
  preloadedMarkdown: Record<string, any>
}

const GlossaryContext = createContext<GlossaryContextValue | null>(null)

interface GlossaryClientProviderProps {
  children: ReactNode
  preloadedMarkdown: Record<string, any>
}

/**
 * Client provider component that makes preloaded glossary MDX content
 * available to GlossaryTooltip components via React Context
 */
export function GlossaryClientProvider({
  children,
  preloadedMarkdown,
}: GlossaryClientProviderProps) {
  return (
    <GlossaryContext.Provider value={{ preloadedMarkdown }}>
      {children}
    </GlossaryContext.Provider>
  )
}

/**
 * Hook to access preloaded glossary MDX content
 * @param term - The glossary term to retrieve
 * @returns The serialized MDX content for the term, or null if not found or not preloaded
 */
export function useGlossaryMarkdown(term: string): any {
  const context = useContext(GlossaryContext)

  if (!context) {
    console.warn(
      'useGlossaryMarkdown must be used within a GlossaryClientProvider'
    )
    return null
  }

  return context.preloadedMarkdown[term] ?? null
}

/**
 * Hook to check if a term has been preloaded
 * @param term - The glossary term to check
 * @returns True if the term has been preloaded (regardless of whether content was found)
 */
export function useIsGlossaryTermPreloaded(term: string): boolean {
  const context = useContext(GlossaryContext)

  if (!context) {
    return false
  }

  return term in context.preloadedMarkdown
}
