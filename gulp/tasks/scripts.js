/**
 * SCRIPTS
 * Tasks for managing javascripts
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
var scripts = require('../gulp-config').scripts;
var uglify = require('../gulp-config').uglify;
var gzip = require('../gulp-config').gzip;

/**
 * CLEAN SCRIPTS
 * Delete the destination folder of content
 */
gulp.task('scripts:clean', function () {
  return $.del(scripts.dest);
});

/**
 * COPY SCRIPTS
 * Copy scripts into destination folder
 * Order is important (i.e. jQuery first), so we need to concat files
 */
gulp.task('scripts:copy', function () {
  return gulp.src(scripts.src)
			.pipe($.sourcemaps.init())
			.pipe($.concat(scripts.filename))
      .pipe($.size({title: 'Script size:'}))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest(scripts.dest));
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

/**
 * INJECT SCRIPTS
 * Inject javascript reference into _includes/scripts.html
 */
gulp.task('scripts:inject', function () {
  return gulp.src(scripts.inject.target)
    .pipe($.inject(gulp.src(scripts.inject.files, {
      read: false
    }), {
      ignorePath: '.tmp/',
      //addRootSlash: false
    }))
    .pipe(gulp.dest(scripts.inject.dest));
});


/**
 * OPTIMISE SCRIPTS
 * Concat script sources into one, unglify and zip up
 * Output dest prior to zip so we have and unziped copy
 */
gulp.task('scripts:optimise', function () {

  //$.del(scripts.dest);

  return gulp.src(scripts.src)
      .pipe($.concat(scripts.filename))
			.pipe($.size({title: 'Concatinated:'}))
      .pipe($.uglify(uglify.options))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.size({title: 'Uglified:'}))
      .pipe(gulp.dest(scripts.dest))
      .pipe($.gzip(gzip.options))
      .pipe($.size({title: 'GZiped:'}))
			.pipe(gulp.dest(scripts.dest));
});

/**
 * REBUILD SCRIPTS
 * Delete destination folder contents then copy styles into folder
 */
gulp.task('scripts:rebuild', gulp.series('scripts:clean', 'scripts:copy', 'scripts:inject'));

/**
 * PRODUCTION BUILD
 * Build javascript for production
 * Clean .tmp directory, copy accross with optimisation then inject new reference
 */
gulp.task('scripts:production', gulp.series('scripts:clean', 'scripts:optimise', 'scripts:inject'));
