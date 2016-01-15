var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
 lazy: true
});

/**
 * INJECT STYLE SHEETS
 * Inject style sheet reference into header
 */
gulp.task('styles:inject', function () {

  return gulp.src(styles.inject.target)
    .pipe($.inject(gulp.src(styles.inject.files, inject.options), {
      ignorePath: '.tmp/',
      //addRootSlash: false
    }))
    .pipe(gulp.dest(styles.inject.dest));
});
