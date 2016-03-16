"use strict";
/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Scripts - Task to manage scripts in project
 */
module.exports = (gulp, config, argv, $) => {
  return callback => {
    gulp
      // Font source files
      .src(config.fonts.src)
      .pipe($.changed(config.fonts.dest))
      .pipe($.flatten())
      .pipe($.size({title: 'Flatten font folder structure:'}))
      .pipe(gulp.dest(config.fonts.dest))
      .pipe($.size({title: 'Fonts copied:'}));

    // Let async know things have finished
    callback();
  };
};
