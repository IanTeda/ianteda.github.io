"use strict";
/**
 * Gulp Image Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage images in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    var stream = gulp
      // Image sources
      .src(config.images.src)
      // Only pipe changed images
      .pipe($.newer(config.images.dest))
      .pipe($.size({title: 'Images:'}))
      // Minimise images
      .pipe($.imagemin(config.imagemin.options))
      .pipe($.size({title: 'Optimised:'}))
      // Save images to destination
      .pipe(gulp.dest(config.images.dest));

    return stream;
  };
};
