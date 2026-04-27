import { getBlogPosts } from 'app/blog/utils'
import BlogContent from 'app/components/BlogContent'
import { CustomMDX } from 'app/components/mdx'
import { baseUrl } from 'app/sitemap'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map(post => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }): import('next').Metadata {
  let post = getBlogPosts().find(post => post.slug === params.slug)
  if (!post) {
    return {}
  }

  let {
    title,
    publishedAt: publishedTime,
    description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }) {
  let post = getBlogPosts().find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.description,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Atriiy',
            },
          }),
        }}
      />
      <BlogContent
        title={post.metadata.title}
        publishedAt={post.metadata.publishedAt}
        slug={post.slug}
        isDraft={post.metadata.draft}
      >
        <CustomMDX source={post.content} frontmatter={post.metadata} />
      </BlogContent>
    </>
  )
}
