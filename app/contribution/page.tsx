import { ContributionList } from 'app/components/ContributionList'
import FadeIn from 'app/components/FadeIn'
import { PageQuote } from 'app/components/PageQuote'
import PageTransition from 'app/components/PageTransition'
import type { Metadata } from 'next'

import { getContributionEntries } from './utils'

export const metadata: Metadata = {
  title: 'Contribution',
  description: 'Open source contributions and pull requests.',
}

export default function Page() {
  const data = getContributionEntries()

  return (
    <PageTransition>
      <section>
        <FadeIn delay={0.2}>
          <PageQuote text='あとのことは時間の手にまかせておけばいい。' />
        </FadeIn>

        <FadeIn delay={0.35} className='mt-10'>
          {data.length > 0 ? (
            <ContributionList data={data} />
          ) : (
            <p className='text-sm italic text-neutral-500'>
              No contributions yet. Check back soon.
            </p>
          )}
        </FadeIn>
      </section>
    </PageTransition>
  )
}
