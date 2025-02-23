import React from 'react'

import 'katex/dist/katex.min.css'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { highlight } from 'sugar-high'

import { Mermaid } from './Mermaid/Mermaid'

function CustomLink(props) {
  let href = props.href
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }
  if (href.startsWith('#')) {
    return <a {...props} />
  }
  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className='rounded-lg' {...props} />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
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
  return (
    <thead className='border-b border-gray-200 dark:border-gray-800'>
      {children}
    </thead>
  )
}

function CustomTh({ children }) {
  return (
    <th className='border border-gray-200 py-2 px-4 text-left font-semibold dark:border-gray-800'>
      {children}
    </th>
  )
}

function CustomTd({ children }) {
  return (
    <td className='whitespace-normal break-words border border-gray-200 py-2 px-4 dark:border-gray-800'>
      {children}
    </td>
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
  pre: ({ children }) => {
    // @ts-ignore
    const childClassName = children?.props?.className || ''
    const code = children?.props?.children || ''

    if (childClassName === 'language-mermaid') {
      return <Mermaid>{code}</Mermaid>
    }

    return (
      <pre>
        <Code className={childClassName}>{code}</Code>
      </pre>
    )
  },
  code: ({ children, className }) => {
    if (className === 'language-mermaid') {
      return <Mermaid>{children}</Mermaid>
    }
    return <code className={className}>{children}</code>
  },
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath, remarkGfm],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  )
}
