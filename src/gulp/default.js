/**
 * DEFAULT TASKS
 * Default Gulp task, serve used during production, build and production tasks
 */

var gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

// We are running a script, so it only knows what it has seen. Need a registry of tasks
gulp.registry(FwdRef());

/**
 * DEFAULT GULP TASK
 * Rebuild all assets, delete gz html and clean asset folder in .build folder
 * During production assets are found in .tmp folder, for production they get copied in
 */
gulp.task('default', gulp.series(
  gulp.parallel('scripts:rebuild', 'styles:rebuild', 'fonts:rebuild', 'images:rebuild', 'html:clean', 'assets:clean'),
  gulp.series('jekyll:rebuild', 'serve')
));

gulp.task('serve', function() {
  browsersync({
    server: {
      baseDir: ['.tmp', 'build']
    }
  });

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('jekyll:build', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('jekyll:build'));
  gulp.watch('src/assets/scripts/**/*.js', gulp.series('scripts:rebuild'));
  gulp.watch(['src/assets/scss/**/*.scss', 'src/assets/styles/**/*.css'], gulp.series('styles:rebuild'));
  gulp.watch('src/assets/images/**/*', reload);
});

/**
 * BUILD JEKYLL WEBSITE
 * Rebuild all assets and Jekyll site
 * It can all be run in parrallel because we are not serving the site, only building
 */
gulp.task('rebuild', gulp.series(
  gulp.parallel('scripts:rebuild', 'styles:rebuild', 'fonts:rebuild', 'images:rebuild', 'html:clean', 'assets:clean', 'jekyll:rebuild')
));

/**
 * BUILD JEKYLL WEBSITE FOR PRODUCTION
 * Rebuild all assets and Jekyll site, optimise all files and copy assets into build folder
 * It can all be run in parrallel because we are not serving the site, only building
 */
gulp.task('production', gulp.series(
  gulp.parallel('scripts:production', 'styles:production', 'fonts:production', 'images:production', 'jekyll:build-production'),
  gulp.series('jekyll:rebuild', 'assets:production', 'html:production')
));

/**
 * DEPLOY JEKYLL WEBSITE
 * Build website for production and then deploy to gh-pages branch in repository
 */
gulp.task('deploy', gulp.series('production', 'gh-pages'));
