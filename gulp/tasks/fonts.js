/**
 * FONTS
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Collect all fonts and copy only changed fonts into assets fonts folder, flattening any folder hierarchy
 * --prod will do the same as above
 */

/**
 * REQUIRES
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
gulp.task('fonts', function () {
  return gulp.src(fonts.src)
    .pipe($.changed(fonts.dest))
    .pipe($.flatten())
    .pipe(gulp.dest(fonts.dest))
    .pipe($.size({
      title: 'Fonts size:',
      showFiles: false
    }));
});
