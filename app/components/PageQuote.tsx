interface PageQuoteProps {
  text: string
}

export function PageQuote({ text }: PageQuoteProps) {
  return (
    <div className='relative'>
      <div
        className='pointer-events-none absolute -inset-x-6 -top-10 h-28 bg-[radial-gradient(circle_at_20%_40%,rgba(229,220,188,0.55),transparent_45%),radial-gradient(circle_at_78%_30%,rgba(194,209,214,0.45),transparent_50%)] opacity-80 blur-3xl'
        aria-hidden
      />
      <figure className='relative border-l border-[var(--color-surface-border)] pl-4'>
        <blockquote>
          <p className='font-baskerville text-base leading-loose tracking-widest text-[var(--color-subtle)]'>
            {text}
          </p>
        </blockquote>
      </figure>
    </div>
  )
}
