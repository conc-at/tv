module.exports = {
  optimization: {
    runtimeChunk: 'single',
    namedChunks: true,
    moduleIds: 'named',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      maxSize: 1024 * 500,
      cacheGroups: {
        app: {
          test: /[\\/]app[\\/]ui/,
          priority: 10,
          name: 'app',
        },
        graphql: {
          test: /[\\/]node_modules[\\/]@apollo|apollo|graphql/,
          priority: 5,
          name: 'graphql',
        },
        react: {
          test: /[\\/]node_modules[\\/]react|styled-components/,
          priority: 5,
          name: 'react',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
          name: 'vendor',
        },
      },
    },
  },
};
