/**
 * GITHUB PAGES
 * Deploy generated pages to Github
 */

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

/**
 * CONFIG
 */
var jekyll = require('../gulp-config').jekyll;

/**
 * GITHUB PAGES
 * Deploy to gh-pages branch
 */
gulp.task('gh-pages', function() {
  return gulp.src(jekyll.deploy)
    .pipe(ghPages());
});
