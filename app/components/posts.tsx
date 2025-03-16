import { getBlogPosts } from 'app/blog/utils'

import { BlogList } from './BlogList'

export function BlogPosts() {
  const allBlogs = getBlogPosts()
  return <BlogList posts={allBlogs} />
}
