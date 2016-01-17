/**
 * GITHUB PAGES
 * Deploy generated pages to Github
 */

/**
 * CONFIG
 */
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

/**
 * CONFIG
 */
var jekyll = require('../gulp-config').jekyll;

/**
 * GITHUB PAGES
 */
gulp.task('gh-pages', function() {
  return gulp.src(jekyll.deploy)
    .pipe(ghPages({
      branch: 'master'
    }));
});
