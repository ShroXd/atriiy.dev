import { getBlogPosts } from 'app/blog/utils'

import BlurText from './components/BlurText/BlurText'
import FadeIn from './components/FadeIn'
import { HomeBlogList } from './components/HomeBlogList'
import PageTransition from './components/PageTransition'

export default function Page() {
  const posts = getBlogPosts()

  return (
    <PageTransition>
      <section>
        <FadeIn>
          <h1 className='font-montserrat'>
            <BlurText
              text={`Hello, I'm Atriiy!`}
              delay={100}
              animateBy='words'
              direction='top'
              className='mb-2 text-2xl font-semibold'
            />
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className='h-28 md:h-20 lg:h-20'>
            Dev, using TypeScript, Rust and Golang. Vim fan. Eighteen plus
            eleven years old now, still have hair, wanna learn many things.
            Writing, reading, playing video games.
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className='my-8'>
            <HomeBlogList posts={posts} />
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
