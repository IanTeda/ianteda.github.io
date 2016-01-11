/**
 * ASSETS
 * Manage assets between .tmp folder and .build folder during development and deployment
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', 'shelljs']
});
var jekyll = require('../gulp-config').jekyll;

/**
 * ASSETS CLEAN
 * Delete assets in Jekyll .build folder
 */
gulp.task('assets:clean', function () {
  return $.del(jekyll.assets);
});

/**
 * COPY CLEAN
 * Copy assets in Jekyll .build folder
 */
gulp.task('assets:copy', function () {
  return gulp.src(jekyll.tmp)
    .pipe($.size({title: 'Assets:'}))
    .pipe(gulp.dest(jekyll.assets));
});

/**
 * REBUILD ASSETS
 * Delete build assets folder contents then copy assets into build folder
 */
gulp.task('assets:production', gulp.series('assets:clean', 'assets:copy'));
