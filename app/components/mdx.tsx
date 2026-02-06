import React from 'react'

import 'katex/dist/katex.min.css'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { highlight } from 'sugar-high'
// @ts-ignore
import { EXIT, visit } from 'unist-util-visit'

import remarkGlossary from '../lib/remark-glossary.mjs'
import AnimatedLink from './AnimatedLink'
import AudioPlayer from './Audio'
import Color from './Color'
import DCTVisualization from './DCTVisualization'
import {
  MapleMonoWrapper,
  MontserratWrapper,
  NunitoSansWrapper,
  SpectralWrapper,
} from './Fonts'
import GlossaryProvider from './GlossaryProvider'
import GlossaryTooltip from './GlossaryTooltip'
import { Mermaid } from './Mermaid/Mermaid'
import { MotionEstimationVisualizer } from './MotionEstimationVisualizer'
import VectorDecomposition from './VectorDecomposition'

function CustomLink(props) {
  return <AnimatedLink {...props} />
}

function RoundedImage(props) {
  return (
    <div className='my-4 flex justify-center'>
      <Image alt={props.alt} className='rounded-lg transition-all' {...props} />
    </div>
  )
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className='font-maple-mono font-medium'
      {...props}
    />
  )
}

// Helper function to extract text from React children (handles nested elements)
function getTextFromChildren(children: any): string {
  if (children == null) {
    return ''
  }
  if (typeof children === 'string') {
    return children
  }
  if (typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('')
  }
  if (
    React.isValidElement<{ children?: React.ReactNode }>(children) &&
    children.props?.children
  ) {
    return getTextFromChildren(children.props.children)
  }
  return ''
}

function slugify(str: any) {
  const text = getTextFromChildren(str)
  return text
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}

function CustomTable({ children }) {
  return (
    <div className='my-6 w-full overflow-x-auto'>
      <table className='w-full border-collapse text-sm'>{children}</table>
    </div>
  )
}

function CustomThead({ children }) {
  return <thead className='border-b border-gray-200'>{children}</thead>
}

function CustomTh({ children }) {
  return (
    <th className='border border-gray-200 py-2 px-4 text-left font-semibold'>
      {children}
    </th>
  )
}

function CustomTd({ children }) {
  return (
    <td className='whitespace-normal break-words border border-gray-200 py-2 px-4'>
      {children}
    </td>
  )
}

function CustomStrong({ children }) {
  return (
    <strong className='font-bold' style={{ fontWeight: 700 }}>
      {children}
    </strong>
  )
}

function CustomParagraph({ children, className, ...props }) {
  // Check for the 'first-paragraph' class added by the rehype plugin
  const isFirst = className?.includes('first-paragraph')

  if (isFirst) {
    let firstChar = ''
    let foundFirstChar = false

    // Recursive helper function to find the first character and modify children
    const processNode = node => {
      if (foundFirstChar) return node // Stop processing if found

      if (typeof node === 'string' && node.trim().length > 0) {
        firstChar = node.trimStart().charAt(0)
        foundFirstChar = true
        // Return the rest of the string, preserving leading/trailing spaces relative to the character
        const charIndex = node.indexOf(firstChar)
        return node.slice(charIndex + 1)
      }

      if (
        React.isValidElement<{ children?: React.ReactNode }>(node) &&
        node.props.children
      ) {
        const originalChildren = node.props.children
        let processedChildren = null

        // Use React.Children.map for robust iteration
        processedChildren = React.Children.map(originalChildren, processNode)

        // If the first char was found within this element's children,
        // clone the element with the modified children.
        // Filter out null/empty string results from slicing
        const validProcessedChildren = React.Children.toArray(
          processedChildren
        ).filter(child => child !== null && child !== '')

        if (foundFirstChar) {
          return React.cloneElement(
            node,
            node.props,
            validProcessedChildren.length > 0 ? validProcessedChildren : null
          )
        }
      }

      // Return node unmodified if it's not a string or element we can process
      return node
    }

    // Use React.Children.map to process top-level children
    const modifiedChildren = React.Children.map(children, processNode)

    // Filter out null results at the top level as well
    const validModifiedChildren = React.Children.toArray(
      modifiedChildren
    ).filter(child => child !== null && child !== '')

    if (foundFirstChar) {
      return (
        // Ensure the className prop is correctly passed and includes 'mb-4'
        <p className={`${className || ''} mb-4`} {...props}>
          <span
            className='float-left mt-1 mr-3 text-7xl font-bold'
            style={{ color: '#a51c30', lineHeight: '0.75' }}
          >
            {firstChar}
          </span>
          {validModifiedChildren.length > 0 ? validModifiedChildren : null}
        </p>
      )
    } else {
      // Fallback: Render as a normal paragraph if no character found (e.g., starts with image/component)
      // Ensure className prop is correctly passed and includes 'mb-4'
      return (
        <p className={`${className || ''} mb-4`} {...props}>
          {children}
        </p>
      )
    }
  }

  // Render normal paragraph if not the first
  // Ensure className prop is correctly passed and includes 'mb-4'
  return (
    <p className={`${className || ''} mb-4`} {...props}>
      {children}
    </p>
  )
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  Image: RoundedImage,
  table: CustomTable,
  thead: CustomThead,
  th: CustomTh,
  td: CustomTd,
  strong: CustomStrong,
  p: CustomParagraph,
  Color: Color,
  GlossaryTooltip: GlossaryTooltip,
  MontserratWrapper: MontserratWrapper,
  NunitoSansWrapper: NunitoSansWrapper,
  SpectralWrapper: SpectralWrapper,
  MapleMonoWrapper: MapleMonoWrapper,
  MotionEstimationVisualizer,
  VectorDecomposition,
  DCTVisualization,
  pre: ({ children }) => {
    // @ts-ignore
    const childClassName = children?.props?.className || ''
    const code = children?.props?.children || ''

    if (childClassName === 'language-mermaid') {
      return (
        <div className='mb-4'>
          <Mermaid>{code}</Mermaid>
        </div>
      )
    }

    return (
      <pre className='font-maple-mono'>
        <Code className={childClassName}>{code}</Code>
      </pre>
    )
  },
  code: ({ children, className }) => {
    if (className === 'language-mermaid') {
      return (
        <div className='mb-4'>
          <Mermaid>{children}</Mermaid>
        </div>
      )
    }
    return <code className={`${className} font-maple-mono`}>{children}</code>
  },
}

interface Frontmatter {
  audioLink?: string
  [key: string]: any
}

// Rehype plugin to mark the first paragraph
const rehypeMarkFirstParagraph = () => tree => {
  visit(tree, 'element', (node, index, parent) => {
    // Check if it's a paragraph element and seems to be a direct child of the main flow
    // This simple check assumes the first <p> encountered in the main flow is the target.
    // You might need more complex logic depending on your exact MDX structure.
    if (node.tagName === 'p') {
      node.properties = node.properties || {}
      node.properties.className = node.properties.className || []
      if (Array.isArray(node.properties.className)) {
        // Ensure we don't add the class multiple times
        if (!node.properties.className.includes('first-paragraph')) {
          node.properties.className.push('first-paragraph')
        }
      }
      // Stop traversal after finding and marking the first paragraph
      return EXIT
    }
    // Optional: Prevent traversal into certain elements if they shouldn't contain the 'first' paragraph
    if (
      ['blockquote', 'figure', 'table', 'ul', 'ol', 'pre', 'details'].includes(
        node.tagName
      )
    ) {
      return 'skip' // Skip children of these elements
    }
  })
  return tree
}

interface CustomMDXProps {
  frontmatter?: Frontmatter
  source: string
  markFirstParagraph?: boolean
  showTOC?: boolean
  [key: string]: any
}

export function CustomMDX({
  frontmatter = {} as Frontmatter,
  source,
  markFirstParagraph = true,
  showTOC = true,
  ...props
}: CustomMDXProps) {
  // Build plugin list and drop any disabled entries to avoid nulls in MDX config
  const rehypePlugins: any = [
    [
      rehypeKatex,
      {
        strict: false,
        trust: true,
      },
    ],
    rehypeSlug,
    markFirstParagraph ? rehypeMarkFirstParagraph : null,
    showTOC
      ? [
          rehypeToc,
          {
            headings: ['h1', 'h2', 'h3', 'h4'],
            position: 'afterbegin',
            customizeTOC: toc => {
              toc.properties.className = ['table-of-contents']
              return toc
            },
          },
        ]
      : null,
    showTOC
      ? () => tree => {
          if (!frontmatter?.audioLink) return tree

          const processNode = node => {
            if (
              node.properties &&
              node.properties.className &&
              Array.isArray(node.properties.className) &&
              node.properties.className.includes('table-of-contents')
            ) {
              const parentChildren = node.parent?.children
              if (parentChildren) {
                const tocIndex = parentChildren.indexOf(node)
                if (tocIndex !== -1) {
                  const audioElement = {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: ['mt-4', 'mb-8'] },
                    children: [
                      {
                        type: 'mdxJsxFlowElement',
                        name: 'Audio',
                        attributes: [
                          {
                            type: 'mdxJsxAttribute',
                            name: 'src',
                            value: frontmatter.audioLink as string,
                          },
                        ],
                        children: [],
                      },
                    ],
                    parent: node.parent,
                  }
                  parentChildren.splice(tocIndex + 1, 0, audioElement)
                }
              }
              return true
            }

            if (node.children && node.children.length) {
              node.children.forEach(child => {
                child.parent = node
              })

              for (const child of node.children) {
                if (processNode(child)) {
                  return true
                }
              }
            }

            return false
          }

          processNode(tree)

          return tree
        }
      : null,
  ]
  const filteredRehypePlugins = rehypePlugins.filter(Boolean)

  return (
    <GlossaryProvider source={source}>
      <MDXRemote
        source={source}
        {...props}
        components={{
          ...components,
          Audio: AudioPlayer,
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath, remarkGfm, remarkGlossary],
            rehypePlugins: filteredRehypePlugins,
          },
        }}
      />
    </GlossaryProvider>
  )
}
