/**
 * JEKYLL
 * Jekyll tasks to serve, build and check
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', 'shelljs']
});

var jekyll = require('../gulp-config').jekyll;

gulp.task('jekyll:clean', function () {
  return $.del(jekyll.build);
});

/**
 * JEKYLL BUILD
 * Build Jekyll
 */
gulp.task('jekyll:build', function (callback) {
  $.shelljs.exec('jekyll build');
  callback();
});

/**
 * JEKYLL PRODUCTION
 * Build Jekyll using production configuration
 */
gulp.task('jekyll:build-production', function (callback) {
  $.shelljs.exec('jekyll build  --config _config.yml,_config.production.yml');
  callback();
});

/**
 * CHECK JEKYLL
 * Check Jekyll build for errors
 */
gulp.task('jekyll:check', function (callback) {
  $.shelljs.exec('jekyll doctor');
  callback();
});

/**
 * REBUILD JEKYLL
 * Delete build folder contents then build jekyll website
 */
gulp.task('jekyll:rebuild', gulp.series('jekyll:clean', 'jekyll:build'));

/**
 * JEKYLL FOR PRODUCTION
 * Delete build folder contents then build jekyll website using production settings
 */
gulp.task('jekyll:production', gulp.series('jekyll:clean', 'jekyll:build-production'));
