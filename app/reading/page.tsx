import FadeIn from 'app/components/FadeIn'
import { PageQuote } from 'app/components/PageQuote'
import PageTransition from 'app/components/PageTransition'
import { ReadingList } from 'app/components/ReadingList'
import type { Metadata } from 'next'

import { getReadingEntries } from './utils'

export const metadata: Metadata = {
  title: 'Reading',
  description: 'Notes from books I am reading or keeping nearby.',
}

export default function Page() {
  const allEntries = getReadingEntries()

  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <PageQuote text='世界はメタファーだ。' />
        </FadeIn>

        <FadeIn delay={0.35} className='mt-10'>
          <ReadingList data={allEntries} />
        </FadeIn>
      </section>
    </PageTransition>
  )
}
