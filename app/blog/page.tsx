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
          <div className='relative mb-10 max-w-2xl'>
            <div
              className='pointer-events-none absolute -inset-x-6 -top-10 h-28 bg-[radial-gradient(circle_at_20%_40%,rgba(229,220,188,0.55),transparent_45%),radial-gradient(circle_at_78%_30%,rgba(194,209,214,0.45),transparent_50%)] opacity-80 blur-3xl'
              aria-hidden
            />
            <p className='font-baskerville relative text-3xl italic leading-relaxed tracking-tight text-[rgb(80,80,65)]'>
              「さあ、これから何を書こうか」
            </p>
            <div className='relative mt-3 h-[1.5px] w-20 bg-gradient-to-r from-neutral-500 via-neutral-700 to-transparent' />
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <BlogPosts />
        </FadeIn>
      </section>
    </PageTransition>
  )
}
