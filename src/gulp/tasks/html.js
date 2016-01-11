/**
 * HTML
 * Copy source images that have changed into the images folder in assets.
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
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
 * OPTIMISE GZIP
 * Delete the destination folder of gzip files
 */
gulp.task('html:clean', function() {
  return $.del(html.gziped);
});

/**
 * OPTIMISE HTML
 * Gzip html files in Jekyll dist folder
 */
gulp.task('html:optimise', function() {
  return gulp.src(html.optimise)
    .pipe($.size({
      title: 'Html:'
    }))
    //.pipe($.htmlmin(htmlmin.options))
    .pipe($.size({
      title: 'Minimised:'
    }))
    //.pipe(gulp.dest(html.dest))
    .pipe($.gzip(gzip.options))
    .pipe($.size({
      title: 'GZiped:'
    }))
    .pipe(gulp.dest(html.dest));
});

/**
 * PRODUCTION BUILD
 * Build style sheets for production
 * Clean .tmp directory, copy accross with optimisation then inject new reference
 */
gulp.task('html:production', gulp.series('html:clean', 'html:optimise'));
