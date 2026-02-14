'use client'

import { motion } from 'framer-motion'
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
    <motion.div
      className='relative inline-block'
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        type='button'
        onClick={handleClick}
        className='relative inline-block transition-all duration-300 ease-out hover:-translate-y-0.5 hover:cursor-pointer focus-visible:outline-offset-2 focus-visible:outline-neutral-800'
      >
        cd ..
      </button>
    </motion.div>
  )
}
