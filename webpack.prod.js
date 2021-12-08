const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin  = require("compression-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
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
  plugins: [
    new JsonMinimizerPlugin( {
      exclude: /\/src/
    }),
    new CompressionPlugin({
      exclude: /\/src/
    }),
    new CleanWebpackPlugin({
      exclude: /\/src/
    })
  ]
});
