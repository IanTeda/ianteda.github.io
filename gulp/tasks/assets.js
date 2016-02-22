/**
 * ASSETS
 * Manage assets between .tmp folder and .build folder during development and deployment
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
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

/**
 * ASSETS
 */
gulp.task('assets', function (){
  return gulp.src(jekyll.tmp)
    .pipe($.if(argv.prod, $.size({title: 'Assets:'})))
    .pipe($.if(argv.prod, gulp.dest(jekyll.assets)));
});