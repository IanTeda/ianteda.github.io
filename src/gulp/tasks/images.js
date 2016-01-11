/**
 * IMAGES
 * Tasks for managing images
 * Lazy loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
	lazy: true
});

/**
 * CONFIG
 */
var images = require('../gulp-config').images;
var imagemin = require('../gulp-config').imagemin;

/**
 * CLEAN IMAGES
 * Delete the destination folder of content
 */
gulp.task('images:clean', function () {
	return $.del(images.dest);
});

/**
 * COPY IMAGES
 * Copy only images that have changed into destination folder
 */
gulp.task('images:copy', function () {
	return gulp.src(images.src)
		.pipe($.changed(images.dest))
		.pipe($.size({title: 'Images:'}))
		.pipe(gulp.dest(images.dest));
});

/**
 * OPTIMISE IMAGES
 * Optimise image file sizes
 */
gulp.task('images:optimise', function () {
	return gulp.src(images.optimise, {base: images.base})
		.pipe($.imagemin(imagemin.options))
		.pipe($.size({title: 'Optimised:'}))
		.pipe(gulp.dest(images.dest));
});

/**
 * REBUILD IMAGES
 * Delete destination folder contents then copy images into folder
 */
gulp.task('images:rebuild', gulp.series('images:clean', 'images:copy'));

/**
 * BUILD IMAGES FOR PRODUCTION
 * Delete destination folder contents, copy images and then optimise
 */
gulp.task('images:production', gulp.series('images:clean', 'images:copy', 'images:optimise'));
