"use strict";
/**
 * Gulp ghPages Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage GitHub Pages in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    var stream = gulp
      .src(config.jekyll.deploy)
      .pipe($.ghPages(config.ghPages.options));

    return stream;
  };
};
