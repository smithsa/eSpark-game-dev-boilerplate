const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const imagemin = require('gulp-imagemin');
const audiosprite = require('audiosprite');
const fs = require("fs");

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

function createSoundsAudioSprite() {
  return new Promise(function(resolve, reject) {
    try {
      createAudioSprites('./src/sounds', './dist/sounds/sounds_audio_sprite');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

gulp.task("createSoundsAudioSprite", createSoundsAudioSprite);

function createAudioSprites(sourcePath, outputPath) {
  let files = [];
  let audioSpriteId = 1;
  fs.readdirSync(sourcePath).forEach(file => {
    if(file.match(/(webm|m4a|mp3|wav|ogg|ac3)/)) {
      files.push(`${sourcePath}/${file}`);
    }
  });
  let opts = {output: `${outputPath}_${audioSpriteId}`};
  audiosprite(files, opts, function(err, obj) {
    if (err) return console.error(err)

    console.log(JSON.stringify(obj, null, 2))
  });
}


gulp.task('default', gulp.series("bundleJavascriptViaWebpack", "compressImages"));
