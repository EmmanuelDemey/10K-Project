const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

gulp.task('htmlmin', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({removeComments: true, removeEmptyAttributes: true, collapseWhitespace: true}))
    .pipe(gulp.dest('docs'));
});

gulp.task('cssmin', function() {
  return gulp.src('style.css')
    .pipe(cleanCSS({compatibility: 'ie7'}))
    .pipe(gulp.dest('docs'));
});

gulp.task('jsmin', function() {
  return gulp.src('script.js')
    .pipe(uglify())
    .pipe(gulp.dest('docs'));
});

gulp.task('default', ['htmlmin', 'cssmin', 'jsmin'], function() {
  console.log('files optimized ! ');
});