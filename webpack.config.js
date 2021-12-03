const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin  = require("compression-webpack-plugin");

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
    })]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/fonts", to: "./fonts" },
        { from: "./src/sounds", to: "./sounds" },
        { from: "./src/voice", to: "./voice" },
        { from: "./src/index.html", to: "./index.html" }
      ],
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin()
  ],
  //devtool: 'source-map' // TODO remove and add to dev
};
