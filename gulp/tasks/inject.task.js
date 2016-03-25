"use strict";
/**
 * Gulp Inject Task
 * @param {target} target - What html file do we want to inject reference
 * @param {references} references - What files to we want to reference
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Scripts - Task to manage Jekyll in project
 */
module.exports = (target, references, destination, gulp, config, $) => {
  return callback => {
    gulp
      .src(target)
      .pipe($.inject(gulp.src(references, config.inject.options), {
        ignorePath: 'tmp/'
        // addRootSlash: false
      }))
    .pipe(gulp.dest(destination));

    callback();
  };
};
