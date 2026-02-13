import { BlogPosts } from 'app/components/posts'

import BlurText from './components/BlurText/BlurText'
import DecryptedText from './components/DecryptedText/DecryptedText'
import FadeIn from './components/FadeIn'
import PageTransition from './components/PageTransition'

export default function Page() {
  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <h1 className='font-montserrat'>
            <BlurText
              text={`Hello, I'm Atriiy!`}
              delay={150}
              animateBy='words'
              direction='top'
              className='mb-2 text-2xl font-semibold'
            />
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className='h-28 md:h-20 lg:h-20'>
            <DecryptedText
              text={`Dev, using TypeScript, Rust and Golang. Vim fan. Eighteen plus eleven years old now, still have hair, wanna learn many things. Writing, reading, playing video games.`}
              animateOn='hover'
              speed={30}
              sequential
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className='my-8'>
            <BlogPosts />
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
