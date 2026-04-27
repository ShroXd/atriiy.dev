import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://atriiy.dev'

export default async function sitemap() {
  let blogs = getBlogPosts()
    .filter(post => !post.metadata.draft)
    .map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))

  let routes = ['', '/blog', '/reading', '/memos', '/contribution'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
