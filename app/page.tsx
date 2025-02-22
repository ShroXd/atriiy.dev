import { BlogPosts } from 'app/components/posts'

import DecryptedText from './components/DecryptedText/DecryptedText'

export default function Page() {
  return (
    <section>
      <h1 className='mb-4 text-2xl font-semibold tracking-tighter'>
        Hi, I'm Atriiy.
      </h1>
      <DecryptedText
        text={`Dev, using TypeScript, Rust and Golang. Vim fans. Eighteen plus eleven years old now, still have hair, wanna learn many things. Writing, reading, playing video games.`}
        animateOn='view'
        speed={30}
        sequential
      />
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  )
}
