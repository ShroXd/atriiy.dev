'use client'

import React, { useState, useEffect } from 'react' // Import React

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    } else if (prefersDark) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
      localStorage.setItem('theme', 'light')
    }
  }, [])

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDarkMode(true)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className='px-3 py-2 rounded-md text-sm font-medium text-nord1 dark:text-nord5 hover:text-nord0 dark:hover:text-nord6'
    >
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  )
}
