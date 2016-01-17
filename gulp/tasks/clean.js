/**
 * CLEAN
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Default: Clean temporary development folders
 * --prod: Clean production folders
 * Other clean tasks handy during development to help fix problems
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', 'shelljs']
});

/**
 * CONFIG
 */
var jekyll = require('../gulp-config').jekyll;

gulp.task('clean:assets', function () {
  return $.del(jekyll.tmp);
});

gulp.task('clean:jekyll', function () {
  return $.del(jekyll.assets);
});

gulp.task('clean:gzip', function () {
  return $.del(jekyll.assets);
});

gulp.task('clean:meta', function () {
  return $.del(jekyll.assets);
});

/**
 * CLEAN
 */
gulp.task('clean', function () {
  if(argv.prod){
    return $.del( jekyll.build);
  } else if (argv.build){
    return $.del(jekyll.build);
  } else {
    return $.del(jekyll.tmp);
  }
})
