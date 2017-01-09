"use strict";
/**
 * Gulp JSDoc Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI 
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage Jekyll in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    var stream = gulp
      .src(config.jsdoc3.src, {read: false})
      .pipe($.jsdoc3(config.jsdoc3.options));

    return stream;
  };
};
