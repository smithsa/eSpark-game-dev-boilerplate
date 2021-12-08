const path = require('path');
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/js/index.js',
  plugins: [
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(false)
    }),
    // TODO copy all contents over to the dist
    new CopyPlugin({
      patterns: [
        { from: "./src/img", to: "./img" },
        { from: "./src/music", to: "./music" },
        { from: "./src/sounds", to: "./sounds" },
        { from: "./src/voice", to: "./voice" },
        { from: "./src/index.html", to: "./index.html" }
      ],
    }),
  ],
  output: {
    filename: './js/[name].bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'dist/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.json$/i,
        type: "asset/resource",
      }
    ]
  },
};
