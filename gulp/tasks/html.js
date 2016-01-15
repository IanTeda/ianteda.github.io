/**
 * HTML
 * Copy source images that have changed into the images folder in assets.
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
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
 * OPTIMISE HTML
 * Gzip html files in Jekyll dist folder
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
