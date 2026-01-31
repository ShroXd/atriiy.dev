export type GlossaryEntry =
  | string
  | {
      title: string
      description: string
    }

export type GlossaryData = Record<string, GlossaryEntry>

export interface GlossaryTooltipProps {
  term: string
  children?: React.ReactNode
  isMarkdownFile?: boolean
}

export interface GlossaryTooltipContent {
  title: string
  description: string
}

declare module '*.json' {
  const value: GlossaryData
  export default value
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glossary-tooltip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & GlossaryTooltipProps,
        HTMLElement
      >
    }
  }
}
