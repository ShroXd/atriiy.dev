module.exports = {
  presets: [
    '@babel/preset-env', // For compiling modern JavaScript down to ES5
    ['@babel/preset-react', { runtime: 'classic' }], // Explicitly set classic runtime
    '@babel/preset-typescript', // For TypeScript
  ],
};
