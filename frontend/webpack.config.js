
module.exports = {
  // ... configurações do webpack ...
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  }  
};
