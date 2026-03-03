'use client'

import { useRouter } from 'next/navigation'

export default function BackLink() {
  const router = useRouter()

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }

    router.push('/')
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className='group flex items-center gap-1.5 text-sm opacity-50 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-[var(--color-link-hover)] hover:cursor-pointer focus-visible:outline-offset-2 focus-visible:outline-neutral-800'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        className='transition-transform duration-200 ease-out group-hover:-translate-x-0.5'
      >
        <path
          d='M10 12L6 8L10 4'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span>back</span>
    </button>
  )
}
