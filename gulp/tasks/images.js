/**
 * IMAGES
 * Lazy load gulp plugins using gulp-load-plugins and attaches them variable $.
 * Copy changed files into .tmp folder
 * --prod optimises images with imagemin
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
var images = require('../gulp-config').images;
var imagemin = require('../gulp-config').imagemin;

 /**
  * IMAGES TASK
  */
gulp.task('images', function () {
  return gulp.src(images.src)
		.pipe($.size({title: 'Images:'}))
    //.pipe($.if(argv.prod, $.cache($.imagemin(imagemin.options))))
    .pipe($.if(argv.prod, $.size({title: 'Optimised:'})))
		.pipe(gulp.dest(images.dest));
})
