/**
 * HTML
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Default the task do not do anything
 * --prod will uglify (minimise) html files and create a gziped copy
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del']
});

/**
 * CONFIG
 */
var html = require('../gulp-config').html;
var gzip = require('../gulp-config').gzip;
var htmlmin = require('../gulp-config').htmlmin;

/**
 * HTML
 */
gulp.task('html', function() {
  return gulp.src(html.optimise)
    .pipe($.if(argv.prod, $.size({title: 'Html:'})))
    .pipe($.if(argv.prod, $.htmlmin(htmlmin.options)))
    .pipe($.if(argv.prod, $.size({title: 'Minimised:'})))
    .pipe($.if(argv.prod, gulp.dest(html.dest)))
    .pipe($.if(argv.prod, $.gzip(gzip.options)))
    .pipe($.if(argv.prod, $.size({title: 'GZiped:'})))
    .pipe($.if(argv.prod, gulp.dest(html.dest)));
});
