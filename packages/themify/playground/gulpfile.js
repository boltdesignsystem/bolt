const rename = require('gulp-rename');
const sass = require('@datorama/postcss-node-sass');
const postcss = require('gulp-postcss');
const gulp = require('gulp');
const { initThemify, themify } = require('../dist');
const browserSync = require('browser-sync').create();
const palette = require('./palette');

const themifyOptions = {
  palette,
  screwIE11: false,
  fallback: {
    cssPath: './dist/theme_fallback.css',
    dynamicPath: './dist/theme_fallback.json'
  }
};

gulp.task('sass', () => {
  return gulp
    .src('./scss/index.theme.scss')
    .pipe(postcss([initThemify(themifyOptions), sass(), themify(themifyOptions)]))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: '.',
    port: 8080
  });

  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
