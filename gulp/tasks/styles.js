/**
 * STYLES
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Create sourcemaps for each css file, concatinate (join) them into one file and move into .tmp folder
 * --prod skips the sourcemaps, concatinates, runs them through postCSS, adds a .min suffix and creates a gzip copy
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var merge = require('merge2');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
  lazy: true
});

/**
 * CONFIG
 */
var styles = require('../gulp-config').styles;
var postcss = require('../gulp-config').postcss;
var gzip = require('../gulp-config').gzip;
var inject = require('../gulp-config').inject;

/**
 * STYLES TASK
 */
gulp.task('styles', function () {
  return merge(
    gulp.src(styles.css)
      .pipe($.if(!argv.prod, $.sourcemaps.init())),
    gulp.src(styles.sass)
      .pipe($.if(!argv.prod, $.sourcemaps.init()))
      .pipe($.sass({
        precision: 10
      }).on('error', $.sass.logError))
    )
    .pipe($.concat(styles.filename))
    .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
    .pipe($.size({title: 'Concatinated:'}))
    .pipe($.if(argv.prod, $.postcss(postcss.processors)))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.size({title: 'PostCSS:'})))
    .pipe($.if(argv.prod, gulp.dest(styles.dest)))
    .pipe($.if(argv.prod, $.gzip(gzip.options)))
    .pipe($.if(argv.prod, $.size({title: 'GZiped:'})))
    .pipe(gulp.dest(styles.dest));
});
