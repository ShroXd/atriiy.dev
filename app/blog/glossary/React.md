# React

**React** is a powerful JavaScript library for building *dynamic* user interfaces, particularly for web applications. It revolutionized frontend development with its **component-based architecture**.

## Core Philosophy

React follows a *declarative paradigm* - you describe **what** the UI should look like, not **how** to achieve it. This makes code more predictable and easier to debug.

### Key Principles

1. **Component Composition** - Build complex UIs from simple components
2. **Unidirectional Data Flow** - Data flows down, events flow up
3. **Virtual DOM** - Efficient reconciliation algorithm
4. **Learn Once, Write Anywhere** - React Native, React Server Components

## Essential Concepts

### JSX Syntax
JSX combines the power of JavaScript with HTML-like syntax:

```jsx
function Greeting({ user, isLoggedIn }) {
  return (
    <div className="welcome">
      {isLoggedIn ? (
        <h1>Welcome back, <strong>{user.name}</strong>!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  )
}
```

### State Management
```javascript
import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

## Modern React Patterns

### Custom Hooks
Extract reusable stateful logic:

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue
  })
  
  const setStoredValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, newValue)
  }
  
  return [value, setStoredValue]
}
```

### Component Composition
Instead of complex inheritance hierarchies, React favors composition:

- **Higher-Order Components (HOCs)** - Wrap components with additional functionality  
- **Render Props** - Share code using props whose values are functions
- **Compound Components** - Multiple components work together as a cohesive unit

## Performance Optimization

> **Pro Tip**: Premature optimization is the root of all evil. Measure first, then optimize.

Common optimization techniques:

1. `React.memo()` for component memoization
2. `useMemo()` and `useCallback()` for expensive calculations
3. Code splitting with `React.lazy()` and Suspense
4. Virtual scrolling for large lists

## Ecosystem & Tools

React has a rich ecosystem of libraries and tools:

- **State Management**: Redux, Zustand, Jotai
- **Routing**: React Router, Next.js Router
- **Styling**: Styled Components, Emotion, Tailwind CSS
- **Testing**: React Testing Library, Jest
- **Development**: React DevTools, Storybook

## Getting Started

Install React using your preferred package manager:

```bash
# Using npm
npm create react-app my-app

# Using Vite (faster)
npm create vite@latest my-app -- --template react

# Using Next.js (full-stack)
npx create-next-app@latest my-app
```

---

*React was created by **Jordan Walke** at Facebook in 2013 and has since become one of the most popular frontend frameworks in the world.*

**Learn More**: [Official React Documentation](https://react.dev) | [React GitHub Repository](https://github.com/facebook/react)