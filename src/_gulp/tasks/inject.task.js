"use strict";
/**
 * Gulp Jekyll Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Scripts - Task to manage Jekyll in project
 */
module.exports = (target, references, gulp, config, $) => {
  return callback => {
    gulp
      .src(target)
      .pipe($.inject(gulp.src(references, config.inject.options), {
        ignorePath: '.tmp/'
        // addRootSlash: false
      }))
    .pipe(gulp.dest(target));

    callback();
  };
};
