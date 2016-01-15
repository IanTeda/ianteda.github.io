/**
 * IMAGES
 * Tasks for managing images
 * Lazy loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 * --prod optimises images with imagemin
 * If not production only pipe changed files
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
  * TASK
  */
gulp.task('images', function () {
  return gulp.src(images.src)
		.pipe($.if(!argv.prod, $.changed(images.dest)))
		.pipe($.size({title: 'Images:'}))
    .pipe($.if(argv.prod, $.cache($.imagemin(imagemin.options))))
    .pipe($.if(argv.prod, $.size({title: 'Optimised:'})))
		.pipe(gulp.dest(images.dest));
})
