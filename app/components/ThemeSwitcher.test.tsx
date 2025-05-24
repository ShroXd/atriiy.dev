import React from 'react' // Import React
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import ThemeSwitcher from './ThemeSwitcher'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false, // Default to light mode
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    localStorageMock.clear()
    document.documentElement.classList.remove('dark')
    // Reset matchMedia mock for each test to default (light)
    window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
  })

  test('initial render: defaults to light mode when no localStorage or prefers-color-scheme', () => {
    render(<ThemeSwitcher />)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()
    expect(localStorageMock.getItem('theme')).toBe('light')
  })

  test('initial render: respects localStorage "dark" theme', () => {
    localStorageMock.setItem('theme', 'dark')
    render(<ThemeSwitcher />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument()
  })

  test('initial render: respects localStorage "light" theme', () => {
    localStorageMock.setItem('theme', 'light')
    render(<ThemeSwitcher />)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()
  })

  test('initial render: respects prefers-color-scheme (dark) if localStorage is empty', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true, // System prefers dark
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    render(<ThemeSwitcher />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument()
    expect(localStorageMock.getItem('theme')).toBe('dark')
  })
  
  test('initial render: respects prefers-color-scheme (light) if localStorage is empty', () => {
    // window.matchMedia already defaults to light (matches: false)
    render(<ThemeSwitcher />)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()
    expect(localStorageMock.getItem('theme')).toBe('light')
  })

  test('button click: toggles theme from light to dark', () => {
    render(<ThemeSwitcher />)
    // Initially light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()

    const button = screen.getByRole('button')
    act(() => {
      fireEvent.click(button)
    })

    // After click, should be dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument()
    expect(localStorageMock.getItem('theme')).toBe('dark')
  })

  test('button click: toggles theme from dark to light', () => {
    localStorageMock.setItem('theme', 'dark')
    render(<ThemeSwitcher />)
    // Initially dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument()

    const button = screen.getByRole('button')
    act(() => {
      fireEvent.click(button)
    })

    // After click, should be light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument()
    expect(localStorageMock.getItem('theme')).toBe('light')
  })

  test('button click: updates localStorage correctly', () => {
    render(<ThemeSwitcher />)
    const button = screen.getByRole('button')

    // Light to Dark
    act(() => {
      fireEvent.click(button)
    })
    expect(localStorageMock.getItem('theme')).toBe('dark')

    // Dark to Light
    act(() => {
      fireEvent.click(button)
    })
    expect(localStorageMock.getItem('theme')).toBe('light')
  })

  test('button text updates correctly on theme toggle', () => {
    render(<ThemeSwitcher />)
    const button = screen.getByRole('button')

    // Initial: Light mode, button shows "Switch to Dark Mode"
    expect(button).toHaveTextContent('Switch to Dark Mode')

    // Click to switch to Dark mode
    act(() => {
      fireEvent.click(button)
    })
    expect(button).toHaveTextContent('Switch to Light Mode')

    // Click to switch back to Light mode
    act(() => {
      fireEvent.click(button)
    })
    expect(button).toHaveTextContent('Switch to Dark Mode')
  })
})
