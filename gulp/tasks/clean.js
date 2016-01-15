var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', 'shelljs']
});


gulp.task('clean:assets', function () {
  return $.del(jekyll.assets);
});

gulp.task('clean:jekyll', function () {
  return $.del(jekyll.assets);
});

gulp.task('clean:gzip', function () {
  return $.del(jekyll.assets);
});

gulp.task('clean:meta', function () {
  return $.del(jekyll.assets);
});
