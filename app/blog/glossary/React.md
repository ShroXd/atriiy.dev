**React** is a powerful JavaScript library for building *dynamic* user interfaces, particularly for web applications. It revolutionized frontend development with its **component-based architecture**.

## Core Philosophy

React follows a *declarative paradigm* - you describe **what** the UI should look like, not **how** to achieve it. This makes code more predictable and easier to debug.

### Key Principles

1. **Component Composition** - Build complex UIs from simple components
2. **Unidirectional Data Flow** - Data flows down, events flow up
3. **Virtual DOM** - Efficient reconciliation algorithm
4. **Learn Once, Write Anywhere** - React Native, React Server Components

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
