var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
	lazy: true
});

/**
 * CHECK SCRIPTS
 * Check javascript files (inc. gulp files) for errors
 * Uses ./.eslintrc for configuration
 */
gulp.task('scripts:check', function () {
  gulp.src(scripts.lint)
    .pipe($.eslint())
    .pipe($.eslint.formatEach())
    .pipe($.eslint.failOnError());
});
