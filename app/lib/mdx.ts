import fs from 'fs'
import path from 'path'

export type MDXMetadata = Record<string, any>

export type MDXEntry<T extends MDXMetadata = MDXMetadata> = {
  metadata: T
  slug: string
  content: string
}

type ParsedFrontmatter<T extends MDXMetadata = MDXMetadata> = {
  metadata: T
  content: string
}

export function parseFrontmatter<T extends MDXMetadata = MDXMetadata>(
  fileContent: string
): ParsedFrontmatter<T> {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Record<string, any> = {}

  let currentKey: string | null = null
  let inArray = false

  frontMatterLines.forEach(line => {
    if (line.trim().startsWith('- ')) {
      if (currentKey && inArray) {
        if (!metadata[currentKey]) {
          metadata[currentKey] = []
        }
        metadata[currentKey].push(line.trim().substring(2))
      }
      return
    }

    if (line.includes(': ')) {
      let [key, ...valueArr] = line.split(': ')
      let value = valueArr.join(': ').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1')

      const trimmedKey = key.trim()
      currentKey = trimmedKey

      if (value === '') {
        inArray = true
        metadata[trimmedKey] = []
      } else {
        inArray = false

        if (value === 'true') {
          metadata[trimmedKey] = true
        } else if (value === 'false') {
          metadata[trimmedKey] = false
        } else {
          metadata[trimmedKey] = value
        }
      }
    }
  })

  return {
    metadata: metadata as T,
    content,
  }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMDXFile<T extends MDXMetadata = MDXMetadata>(
  filePath: string
): ParsedFrontmatter<T> {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter<T>(rawContent)
}

export function getMDXData<T extends MDXMetadata = MDXMetadata>(
  dir: string
): MDXEntry<T>[] {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map(file => {
    let { metadata, content } = readMDXFile<T>(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}
