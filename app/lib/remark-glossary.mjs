import { visit } from 'unist-util-visit'

/**
 * Remark plugin to transform abbr: links into GlossaryTooltip components
 * Transforms [React](abbr:React) into <GlossaryTooltip term="React">React</GlossaryTooltip>
 */
export default function remarkGlossary() {
  return tree => {
    // Track if we're inside a code block to skip processing
    let insideCodeBlock = false

    visit(tree, (node, index, parent) => {
      if (node.type === 'code' || node.type === 'inlineCode') {
        return 'skip'
      }

      if (
        node.type === 'element' &&
        (node.tagName === 'pre' || node.tagName === 'code')
      ) {
        return 'skip'
      }

      if (node.type === 'link' && node.url && node.url.startsWith('abbr:')) {
        const fullTerm = node.url.replace('abbr:', '')
        const isMarkdownFile = fullTerm.endsWith('.md')
        const term = isMarkdownFile ? fullTerm.replace('.md', '') : fullTerm

        const linkText =
          node.children && node.children.length > 0
            ? node.children
            : [{ type: 'text', value: term }]

        const attributes = [
          {
            type: 'mdxJsxAttribute',
            name: 'term',
            value: term,
          },
        ]

        if (isMarkdownFile) {
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'isMarkdownFile',
            value: true,
          })
        }

        const glossaryElement = {
          type: 'mdxJsxTextElement',
          name: 'GlossaryTooltip',
          attributes,
          children: linkText,
          data: {
            _mdxExplicitJsx: true,
          },
        }

        if (parent && typeof index === 'number') {
          parent.children[index] = glossaryElement
        }

        return 'skip'
      }

      return 'continue'
    })

    return tree
  }
}
