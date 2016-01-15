/**
 * SERVE
 * Tasks for managing images
 * Lazy loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
	lazy: true
});

gulp.task('serve', function() {
  browsersync({
    server: {
      baseDir: ['.tmp', 'build']
    }
  });

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('jekyll:rebuild', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('jekyll:rebuild'));
  gulp.watch('src/assets/scripts/**/*.js', gulp.series('scripts'));
  gulp.watch(['src/assets/scss/**/*.scss', 'src/assets/styles/**/*.css'], gulp.series('styles:rebuild'));
  gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
});
