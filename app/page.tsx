import { BlogPosts } from 'app/components/posts'

import BlurText from './components/BlurText/BlurText'
import DecryptedText from './components/DecryptedText/DecryptedText'

export default function Page() {
  return (
    <section>
      <h1>
        <BlurText
          text={`Hello, I'm Atriiy!`}
          delay={150}
          animateBy='words'
          direction='top'
          className='mb-2 text-2xl font-semibold'
        />
      </h1>
      <div className='h-28 md:h-20 lg:h-20'>
        <DecryptedText
          text={`Dev, using TypeScript, Rust and Golang. Vim fans. Eighteen plus eleven years old now, still have hair, wanna learn many things. Writing, reading, playing video games.`}
          animateOn='hover'
          speed={30}
          sequential
        />
      </div>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  )
}
