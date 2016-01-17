/**
 * JEKYLL
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Execute a shell comand to build Jekyll site
 * --prod builds with an additional Jekyll config file to overwrite variables for production environment
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', 'shelljs']
});

/**
 * JEKYLL TASK
 */
gulp.task('jekyll', function (callback) {
  if(argv.prod){
    $.shelljs.exec('jekyll build --config _config.yml,_config.production.yml');
    callback();
  } else {
    $.shelljs.exec('jekyll build --config _config.yml');
    callback();
  }
})
