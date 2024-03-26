const path = require('path')

const webpackBase = {
  // ...require('../../build/webpack/webpack.config.base')
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: ['node_modules'],
  },

  // plugins: [
  //   // new webpack.EnvironmentPlugin({
  //   //   NODE_ENV: 'production',
  //   // }),

  //   new webpack.NamedModulesPlugin(),
  // ],
}

const main = {
  ...webpackBase,

  target: 'electron-main',

  entry: {
    index: './src/index.ts',
  },

  node: {
    __dirname: false
  },

  output: {
    path: path.join(__dirname, 'dist'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },
}

const preload = {
  ...webpackBase,

  target: 'electron-preload',

  entry: {
    preload: './src/preload.ts'
  },

  output: {
    path: path.join(__dirname, 'dist'),
  },
}

const libs = {
  ...webpackBase,

  target: 'electron-preload',

  entry: {
    'browser-action': './src/browser-action.ts',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
}

module.exports = [main, preload, libs]
