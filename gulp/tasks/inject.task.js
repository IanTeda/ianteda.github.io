"use strict";
/**
 * Gulp Inject Task
 * @param {target} target - What html file do we want to inject reference
 * @param {references} references - What files to we want to reference
 * @param {destination} destination - Where is the target file with the injected reference going
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage Jekyll in project
 */
module.exports = (target, references, destination, gulp, config, $) => {
  return function() {
    var stream = gulp
      .src(target)
      .pipe($.inject(gulp.src(references, config.inject.options), {
        ignorePath: config.inject.ignorePath
        //addRootSlash: false
      }))
      .pipe(gulp.dest(destination)
    );

    return stream;
  };
};
