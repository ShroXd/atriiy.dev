import { BlogPosts } from 'app/components/posts'

const introduction = (
  <>
    Hi, I'm Atriiy, an interest-driven dev.
    <br />
    <br />
    I'm not good at introducing myself not only in reality but also on the web.
    <br />
    But even if I can escape, I still have to face it.
    <br />
    So, the following is my introduction.
    <br />
    <br />
    Dev, using TypeScript, Rust and Golang. Vim fans.
    <br />
    <br />
    Eighteen plus eleven years old now, still have hair, wanna learn many
    things.
    <br />
    Writing, reading, playing video games.
    <br />
    <br />
    Ok, stop right here.
  </>
)

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>
        My Portfolio
      </h1>
      <p className='mb-4'>{introduction}</p>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  )
}
