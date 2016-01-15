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
