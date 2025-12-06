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
  const sections = [
    {
      title: 'Currently reading',
      entries: readingEntries,
      showThought: false,
      forceGrid: true,
    },
    {
      title: 'Queued up',
      entries: queuedEntries,
      showThought: false,
      forceGrid: true,
    },
    {
      title: 'Finished with notes',
      entries: finishedEntries,
      showThought: true,
      forceGrid: false,
    },
  ]

  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <div className='relative max-w-2xl'>
            <div
              className='pointer-events-none absolute -inset-x-6 -top-10 h-28 bg-[radial-gradient(circle_at_20%_40%,rgba(229,220,188,0.55),transparent_45%),radial-gradient(circle_at_78%_30%,rgba(194,209,214,0.45),transparent_50%)] opacity-80 blur-3xl'
              aria-hidden
            />
            <p className='relative font-baskerville text-3xl italic leading-relaxed tracking-tight text-[rgb(80,80,65)]'>
              世界はメタファーだ
            </p>
            <div className='relative mt-3 h-[1.5px] w-20 bg-gradient-to-r from-neutral-500 via-neutral-700 to-transparent' />
          </div>
        </FadeIn>

        <FadeIn delay={0.35} className='mt-6 space-y-12'>
          <div className='relative space-y-16'>
            <div className='pointer-events-none absolute left-3 top-2 bottom-0 w-px bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent' />
            {sections
              .filter(section => section.entries.length > 0)
              .map((section, idx) => (
                <div
                  key={section.title}
                  className='relative pl-10'
                  style={{ zIndex: sections.length - idx }}
                >
                  <div className='absolute -left-1 top-1.5 flex items-center justify-center'>
                    <span className='h-3 w-3 rounded-full border border-neutral-500 bg-[rgb(242,242,227)] shadow-[0_0_0_6px_rgba(242,242,227,0.9)]' />
                  </div>
                  <div className='mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-neutral-500'>
                    <span className='rounded-full bg-neutral-200/70 px-3 py-1 font-semibold'>
                      {section.title}
                    </span>
                    <span className='h-px flex-1 bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent' />
                  </div>
                  <ReadingList
                    entries={section.entries}
                    showThought={section.showThought}
                    forceGrid={section.forceGrid}
                  />
                </div>
              ))}
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
