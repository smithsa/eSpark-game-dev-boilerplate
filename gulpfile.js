const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

function bundleJavascriptViaWebpack () {
  gulp.src('src/js/index.js')
    .pipe(
      gulpWebpack(webpackConfig, webpack)
    )
    .pipe(gulp.dest('dist/'));
}
gulp.task("bundleJavascriptViaWebpack", bundleJavascriptViaWebpack);

function compressImages() {
  return gulp.src("./src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"));
}

gulp.task("compressImages", compressImages);

gulp.task('default', gulp.series("bundleJavascriptViaWebpack", "compressImages"));
