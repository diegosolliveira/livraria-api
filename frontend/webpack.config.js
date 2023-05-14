module.exports = {
  // ... configurações do webpack ...
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "path": require.resolve("path-browserify")
    },
    alias: {
      path: require.resolve('path-browserify'),
    },
  }
};
