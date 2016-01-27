/**
 * BROWSERSYNC
 * Start browsersync
 * --prod will start browsersync from build directory only
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var browsersync = require('browser-sync');
var reload = browsersync.reload;


/**
 * BROWSERSYNC
 */
gulp.task('browsersync', function() {

  if (argv.prod){
    var baseDir = ['build'];
  } else {
    var baseDir = ['.tmp', 'build'];
  }

  browsersync({
    server: {
      baseDir: baseDir
    }
  });

  // Watch files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('jekyll', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('jekyll', reload));
  gulp.watch('src/assets/scripts/**/*.js', gulp.series('scripts', reload));
  gulp.watch(['src/assets/sass/**/*.scss', 'src/assets/styles/**/*.css'], gulp.series('styles', reload));
  gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
});
