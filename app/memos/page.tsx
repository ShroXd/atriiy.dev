import FadeIn from 'app/components/FadeIn'
import { MemosList } from 'app/components/MemosList'
import { PageQuote } from 'app/components/PageQuote'
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
          <PageQuote text='遠くから見れば、大抵のものは綺麗に見える' />
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
