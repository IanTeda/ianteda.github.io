/**
 * INJECT
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Inject styles and scripts into include files, ignoring the .tmp/ folder in path
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
 lazy: true
});

/**
 * CONFIG
 */
var inject = require('../gulp-config').inject;
var scripts = require('../gulp-config').scripts;
var styles = require('../gulp-config').styles;


/**
 * INJECT STYLE SHEETS
 * Inject style sheet reference into _includes/styles.html
 */
gulp.task('inject:styles', function () {
  return gulp.src(styles.inject.target)
    .pipe($.inject(gulp.src(styles.inject.files, inject.options), {
      ignorePath: '.tmp/'
      //addRootSlash: false
    }))
    .pipe(gulp.dest(styles.inject.dest));
});


/**
 * INJECT SCRIPTS
 * Inject javascript reference into _includes/scripts.html
 */
gulp.task('inject:scripts', function () {
  return gulp.src(scripts.inject.target)
    .pipe($.inject(gulp.src(scripts.inject.files, {
      read: false
    }), {
      ignorePath: '.tmp/'
      //addRootSlash: false
    }))
    .pipe(gulp.dest(scripts.inject.dest));
});

/**
 * INJECT
 */
gulp.task('inject', gulp.parallel('inject:styles', 'inject:scripts'));
