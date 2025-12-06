import FadeIn from 'app/components/FadeIn'
import PageTransition from 'app/components/PageTransition'
import { ReadingList } from 'app/components/ReadingList'
import type { Metadata } from 'next'

import { getReadingEntries } from './utils'

export const metadata: Metadata = {
  title: 'Reading',
  description: 'Notes from books I am reading or keeping nearby.',
}

export default function Page() {
  const readingEntries = getReadingEntries()

  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <h1 className='font-montserrat mb-3 text-2xl font-semibold tracking-tighter'>
            Reading Log
          </h1>
          <p className='max-w-2xl text-neutral-700'>
            Books I am spending time with or keeping within reach, captured as
            short reading notes.
          </p>
        </FadeIn>

        <FadeIn delay={0.35} className='mt-6'>
          <ReadingList entries={readingEntries} />
        </FadeIn>
      </section>
    </PageTransition>
  )
}
