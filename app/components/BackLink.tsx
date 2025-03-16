'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BackLink() {
  return (
    <motion.div
      className='relative inline-block'
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href='/blog'
        className='relative inline-block text-neutral-600 transition-colors duration-200 hover:text-neutral-800'
      >
        cd ..
      </Link>
    </motion.div>
  )
}
