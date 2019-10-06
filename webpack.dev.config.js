const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  externals:[ nodeExternals() ],
  entry: {
    app: './src/server.ts'
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: [/\.ts$/],
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      Classes: path.resolve(__dirname, 'src/classes/'),
      Models: path.resolve(__dirname, 'src/models/'),
      Types: path.resolve(__dirname, 'src/types/')
    },
    extensions: [ '.ts', '.gql', '.graphql' ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ]
};
