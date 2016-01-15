/**
 * STYLES
 * Copy source images that have changed into the images folder in assets.
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var argv = require('yargs').argv;
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

gulp.task('styles', function () {
  return gulp.src(styles.src)
      .pipe($.if(!argv.prod, $.sourcemaps.init()))
      .pipe($.concat(styles.filename))
      .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
      .pipe($.size({title: 'Concatinated:'}))
      .pipe($.if(argv.prod, $.postcss(postcss.processors)))
      .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
      .pipe($.if(argv.prod, $.size({title: 'PostCSS:'})))
      .pipe(gulp.dest(styles.dest))
      .pipe($.if(argv.prod, $.gzip(gzip.options)))
      .pipe($.if(argv.prod, $.size({title: 'GZiped:'})))
      .pipe(gulp.dest(styles.dest));
});
