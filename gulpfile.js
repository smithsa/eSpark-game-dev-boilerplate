const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const imagemin = require('gulp-imagemin');

function bundleJavascriptViaWebpack () {
  return gulp.src('src/js/index.js')
    .pipe(
      gulpWebpack(webpackConfig, webpack)
    )
    .pipe(gulp.dest('dist/'));
}
gulp.task("bundleJavascriptViaWebpack", bundleJavascriptViaWebpack);

function compressImages() {
  return gulp.src("./src/img/**/*.{png,jpg,jpeg,JPG,svg}")
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 7
    }))
    .pipe(gulp.dest("./dist/img"));
}

gulp.task("compressImages", compressImages);

gulp.task('default', gulp.series("bundleJavascriptViaWebpack", "compressImages"));
