import { formatDate, getBlogPosts } from 'app/blog/utils'
import Link from 'next/link'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map(post => (
          <Link
            key={post.slug}
            className='mb-4 flex flex-col space-y-1'
            href={`/blog/${post.slug}`}
          >
            <div className='space-x-0 md:flex-row md:space-x-2'>
              <p className='tracking-tight text-neutral-900 dark:text-neutral-200'>
                {post.metadata.title}
                <span className='ml-6 text-xs tabular-nums text-neutral-600 dark:text-neutral-400'>
                  {formatDate(post.metadata.publishedAt, false)}
                </span>
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
