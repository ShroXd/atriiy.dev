import { readFile } from 'fs/promises'
import { join } from 'path'

const GLOSSARY_DIR = join(process.cwd(), 'app', 'blog', 'glossary')

/**
 * Server-side utility to read a markdown file from the glossary folder
 * @param filename - The markdown filename (without .md extension)
 * @returns The markdown content as a string, or null if file doesn't exist
 */
export async function readGlossaryMarkdown(
  filename: string
): Promise<string | null> {
  try {
    const filePath = join(GLOSSARY_DIR, `${filename}.md`)
    const content = await readFile(filePath, 'utf-8')
    return content
  } catch (error) {
    console.warn(`Glossary markdown file not found: ${filename}.md`)
    return null
  }
}

/**
 * Check if a glossary markdown file exists
 * @param filename - The markdown filename (without .md extension)
 * @returns True if file exists, false otherwise
 */
export async function glossaryMarkdownExists(
  filename: string
): Promise<boolean> {
  try {
    const filePath = join(GLOSSARY_DIR, `${filename}.md`)
    await readFile(filePath, 'utf-8')
    return true
  } catch {
    return false
  }
}

/**
 * Get all available glossary markdown files
 * @returns Array of filenames (without .md extension)
 */
export async function getGlossaryMarkdownFiles(): Promise<string[]> {
  try {
    const { readdir } = await import('fs/promises')
    const files = await readdir(GLOSSARY_DIR)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch (error) {
    console.warn('Could not read glossary directory:', error)
    return []
  }
}

/**
 * Preload glossary markdown content for multiple terms
 * This is useful for server-side rendering where we want to avoid client-side loading
 * @param terms - Array of terms to preload
 * @returns Object mapping terms to their content (or null if not found)
 */
export async function preloadGlossaryMarkdown(
  terms: string[]
): Promise<Record<string, string | null>> {
  const results: Record<string, string | null> = {}

  await Promise.all(
    terms.map(async term => {
      results[term] = await readGlossaryMarkdown(term)
    })
  )

  return results
}
