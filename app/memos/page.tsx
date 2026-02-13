import FadeIn from 'app/components/FadeIn'
import { MemosList } from 'app/components/MemosList'
import PageTransition from 'app/components/PageTransition'
import type { Metadata } from 'next'

import { getMemoEntries } from './utils'

export const metadata: Metadata = {
  title: 'Memos',
  description: 'Short thoughts, ideas, and notes.',
}

export default function Page() {
  const entries = getMemoEntries()

  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <div className='relative max-w-2xl'>
            <div
              className='pointer-events-none absolute -inset-x-6 -top-10 h-28 bg-[radial-gradient(circle_at_20%_40%,rgba(229,220,188,0.55),transparent_45%),radial-gradient(circle_at_78%_30%,rgba(194,209,214,0.45),transparent_50%)] opacity-80 blur-3xl'
              aria-hidden
            />
            <p className='font-baskerville relative text-3xl italic leading-relaxed tracking-tight text-[rgb(80,80,65)]'>
              「遠くから見れば、大抵のものは綺麗に見える」
            </p>
            <div className='relative mt-3 h-[1.5px] w-20 bg-gradient-to-r from-neutral-500 via-neutral-700 to-transparent' />
          </div>
        </FadeIn>

        <FadeIn delay={0.35} className='mt-10'>
          {entries.length > 0 ? (
            <MemosList entries={entries} />
          ) : (
            <p className='text-sm italic text-neutral-500'>
              No memos yet. Check back soon.
            </p>
          )}
        </FadeIn>
      </section>
    </PageTransition>
  )
}
