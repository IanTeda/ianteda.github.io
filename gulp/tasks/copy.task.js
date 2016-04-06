"use strict";
/**
 * Gulp Copy Task
 * @param {source} source - Source files to be copied
 * @param {destination} destination - Destination folder to copy files into
 * @param {gulp} gulp - The gulp module passed in
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to copy files in project
 */
module.exports = (source, destination, gulp, argv, $) => {
  return function() {
    var stream = gulp
      .src(source)
      .pipe($.size({title: 'Copied:'}))
      .pipe(gulp.dest(destination));

    return stream;
  };
};
