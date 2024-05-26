// metro.config.js
module.exports = {
    transformer: {
      // You can specify a custom transformer if needed
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
    },
    resolver: {
      // List file extensions for resolving modules
      sourceExts: ['jsx', 'js', 'ts', 'tsx'],
    },
  };
  