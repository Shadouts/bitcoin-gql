const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
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
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      }
    ]
  },
  resolve: {
    alias: {
      Classes: path.resolve(__dirname, 'src/classes/'),
      GQLTypeDefs: path.resolve(__dirname, 'src/gqlTypeDefs/'),
      Models: path.resolve(__dirname, 'src/models/'),
      Schema: path.resolve(__dirname, 'src/schema/'),
      Types: path.resolve(__dirname, 'src/types/')
    },
    extensions: [ '.ts' ]
  }
};
