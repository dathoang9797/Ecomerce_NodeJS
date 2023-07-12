const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const typescriptTransformerPaths = require("typescript-transform-paths").default;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const prod = process.argv[3];

module.exports = {
  target: 'node',
  entry: './src/index.ts',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  mode: prod ? 'production' : 'development',
  devtool: prod ? null : 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: (program) => {
            return {
              before: [typescriptTransformerPaths(program, {})],
              afterDeclarations: [typescriptTransformerPaths(program, {
                afterDeclarations: true
              })]
            }
          }
        }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    minimize: true, // enabling this reduces file size and readability
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [
    new Dotenv(),
  ].concat(prod
    ? []
    : [new NodemonPlugin({
      // Extensions to watch.
      ext: 'ts,js,json',
      verbose: true,
    }),]),
};
