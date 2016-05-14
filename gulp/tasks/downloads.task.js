"use strict";
/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage fonts in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    var stream = gulp
      // Downloads source files
      .src(config.downloads.src)
      .pipe($.newer(config.downloads.dest))
      .pipe(gulp.dest(config.downloads.dest))
      .pipe($.size({title: 'Downloads copied:'}));

    return stream;
  };
};
