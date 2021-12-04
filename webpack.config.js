const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin  = require("compression-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/[name].bundle.min.js',
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
    })],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
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
  plugins: [
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(false)
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/fonts", to: "./fonts" },
        { from: "./src/img", to: "./img" },
        { from: "./src/music", to: "./music" },
        { from: "./src/sounds", to: "./sounds" },
        { from: "./src/voice", to: "./voice" },
        { from: "./src/index.html", to: "./index.html" }
      ],
    }),
    new JsonMinimizerPlugin( {
      exclude: /\/src/
    }),
    new CompressionPlugin({
      exclude: /\/src/
    }),
    new CleanWebpackPlugin({
      exclude: /\/src/
    })
  ],
  //devtool: 'source-map' // TODO remove and add to dev
};
