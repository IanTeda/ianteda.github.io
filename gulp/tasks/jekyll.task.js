"use strict";
/**
 * Gulp Jekyll Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Scripts - Task to manage Jekyll in project
 */
module.exports = (gulp, config, argv, $) => {
  return callback => {
    if (argv.prod) {
      $.shelljs.exec(
        'jekyll build --config _config.yml,_config.production.yml'
      );
      callback();
    } else {
      $.shelljs.exec(
        'jekyll build --config _config.yml'
      );
      callback();
    }
  };
};
