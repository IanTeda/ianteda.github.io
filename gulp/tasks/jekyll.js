/**
 * JEKYLL
 * Jekyll tasks to serve, build and check
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', 'shelljs']
});

gulp.task('jekyll', function (callback) {
  if(argv.prod){
    $.shelljs.exec('jekyll build  --config _config.yml,_config.production.ym');
    callback();
  } else {
    $.shelljs.exec('jekyll build');
    callback();
  }
})
