import FadeIn from 'app/components/FadeIn'
import { PageQuote } from 'app/components/PageQuote'
import PageTransition from 'app/components/PageTransition'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <div className='mb-10'>
            <PageQuote text='さあ、これから何を書こうか' />
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <BlogPosts />
        </FadeIn>
      </section>
    </PageTransition>
  )
}
