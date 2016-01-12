/**
 * FONTS
 * Collect all fonts and copy into fonts folder in assets
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del']
});

/**
 * CONFIG
 */
var fonts = require('../gulp-config').fonts;

/**
 * CLEAN FONTS
 * Delete the destination folder of content
 */
gulp.task('fonts:clean', function () {
  return $.del(fonts.dest);
});

/**
 * COPY FONTS
 * Flatten folder structure
 * Copy only fonts that have changed into destination folder
 */
gulp.task('fonts:copy', function () {
  return gulp.src(fonts.src)
    .pipe($.changed(fonts.dest))
    .pipe($.flatten())
    .pipe(gulp.dest(fonts.dest))
    .pipe($.size({
      title: 'Fonts size:',
      showFiles: false
    }));
});

/**
 * REBUILD FONTS
 * Clean destination folder content then copy fonts into folder
 */
gulp.task('fonts:rebuild', gulp.series('fonts:clean', 'fonts:copy'));

/**
 * REBUILD FONTS
 * Clean destination folder content then copy fonts into folder
 */
gulp.task('fonts:production', gulp.series('fonts:clean', 'fonts:copy'));
