const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');
const {presets} = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [].map(moduleName =>
  path.resolve(appDirectory, `node_modules/${moduleName}`),
);

const babelLoaderConfiguration = {
  test: /\.(tsx|ts|js|jsx)$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              '^react-native$': 'react-native-web',
            },
          },
        ],
        'react-native-web',
      ],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

module.exports = {
  entry: ['./index.web.js'],

  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
    sourceMapFilename: '[name].js.map',
  },

  devtool: 'source-map',

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },

  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.js',
      '.web.jsx',
      '.js',
      '.jsx',
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({JEST_WORKER_ID: null}),
    new webpack.ProvidePlugin({
      __DEV__: process.env.NODE_ENV !== 'production' || true,
    }),
  ],
};
