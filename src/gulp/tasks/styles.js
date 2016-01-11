/**
 * STYLES
 * Copy source images that have changed into the images folder in assets.
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

 var gulp = require('gulp');
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
 * CLEAN STYLES
 * Delete the destination folder of content
 */
gulp.task('styles:clean', function () {
  return $.del(styles.dest);
});


/**
 * COPY STYLES
 * Concat styles into destination folder
 * Order is important so we concatinating
 */
gulp.task('styles:copy', function () {
  return gulp.src(styles.src)
			.pipe($.sourcemaps.init())
			.pipe($.concat(styles.filename))
			.pipe($.sourcemaps.write('./'))
      .pipe($.size({title: 'Style size:'}))
			.pipe(gulp.dest(styles.dest));
});

/**
 * LINT STYLES
 * Check style sheet files for errors
 */
gulp.task('styles:check', function () {

});

/**
 * INJECT STYLE SHEETS
 * Inject style sheet reference into header
 */
gulp.task('styles:inject', function () {

  return gulp.src(styles.inject.target)
    .pipe($.inject(gulp.src(styles.inject.files, inject.options), {
      ignorePath: '.tmp/',
      //addRootSlash: false
    }))
    .pipe(gulp.dest(styles.inject.dest));
});



/**
 * OPTIMISE STYLES
 * Optimise styles file sizes
 */
gulp.task('styles:optimise', function () {
  return gulp.src(styles.src)
      .pipe($.concat(styles.filename))
      .pipe($.size({title: 'Concatinated:'}))
      .pipe($.postcss(postcss.processors))
      .pipe($.size({title: 'PostCSS:'}))
      .pipe($.rename({suffix: '.min'}))
      .pipe(gulp.dest(styles.dest))
      .pipe($.gzip(gzip.options))
      .pipe($.size({title: 'GZiped:'}))
			.pipe(gulp.dest(styles.dest));
});

/**
 * REBUILD STYLES
 * Delete destination folder contents then copy styles into folder
 */
gulp.task('styles:rebuild', gulp.series('styles:clean', 'styles:copy', 'styles:inject'));

/**
 * PRODUCTION BUILD
 * Build style sheets for production
 * Clean .tmp directory, copy accross with optimisation then inject new reference
 */
gulp.task('styles:production', gulp.series('styles:clean', 'styles:optimise', 'styles:inject'));
