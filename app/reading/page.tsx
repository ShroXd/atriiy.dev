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
  const allEntries = getReadingEntries()
  const readingEntries = allEntries.filter(
    entry => entry.metadata.status === 'Reading'
  )
  const finishedEntries = allEntries.filter(
    entry => entry.metadata.status === 'Finished'
  )
  const queuedEntries = allEntries.filter(
    entry => entry.metadata.status === 'Queued'
  )

  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <h1 className='font-montserrat mb-3 text-2xl font-semibold tracking-tighter'>
            Reading Log
          </h1>
          <p className='max-w-2xl text-neutral-700'>
            Books I am spending time with or keeping within reach, plus finished
            reads and notes.
          </p>
        </FadeIn>

        <FadeIn delay={0.35} className='mt-6 space-y-12'>
          <div className='space-y-4'>
            <h2 className='font-montserrat text-xl font-semibold tracking-tight text-neutral-900'>
              Currently reading
            </h2>
            <ReadingList
              entries={readingEntries}
              showThought={false}
              forceGrid
            />
          </div>

          <div className='space-y-4'>
            <h2 className='font-montserrat text-xl font-semibold tracking-tight text-neutral-900'>
              Queued up
            </h2>
            <ReadingList entries={queuedEntries} showThought={false} forceGrid />
          </div>

          <div className='space-y-4'>
            <h2 className='font-montserrat text-xl font-semibold tracking-tight text-neutral-900'>
              Finished with notes
            </h2>
            <ReadingList entries={finishedEntries} showThought />
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
