Rolldown supports Manual Code Splitting, allowing you to explicitly control how modules are grouped into chunks. This configuration pattern is similar to the splitChunks feature in Webpack.

```json
{
  name: 'react-vendor',
  test: /node_modules\/(react|react-dom)/,
  priority: 20,
  minSize: 20000
},
{
  name: (moduleId) => {
    if (moduleId.includes('src/features/auth')) return 'auth-feature';
    if (moduleId.includes('src/features/dashboard')) return 'dashboard-feature'; 
    if (moduleId.includes('src/features/')) return 'other-features';
    return null; // Skip this module
  },
  test: (moduleId) => moduleId.includes('src/features/'),
  priority: 8
}
```

For more advanced usage and details, refer to the [official documentation](https://rolldown.rs/in-depth/manual-code-splitting#why-use-manual-code-splitting).
