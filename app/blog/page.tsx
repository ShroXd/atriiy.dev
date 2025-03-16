import FadeIn from 'app/components/FadeIn'
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
          <h1 className='font-montserrat mb-8 text-2xl font-semibold tracking-tighter'>
            My Blog
          </h1>
        </FadeIn>
        <FadeIn delay={0.3}>
          <BlogPosts />
        </FadeIn>
      </section>
    </PageTransition>
  )
}
