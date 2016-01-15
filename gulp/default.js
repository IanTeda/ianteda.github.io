/**
 * DEFAULT TASKS
 * Default Gulp task, serve used during production, build and production tasks
 */

var gulp = require('gulp');

/**
 * DEFAULT GULP TASK
 * Rebuild all assets, delete gz html and clean asset folder in .build folder
 * During production assets are found in .tmp folder, for production they get copied in
 */
gulp.task('default', gulp.series(
  gulp.parallel('scripts', 'styles', 'fonts', 'images', 'html:clean', 'assets:clean'),
  gulp.series('inject', 'jekyll', 'browsersync')
));
