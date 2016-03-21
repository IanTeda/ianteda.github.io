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
    gulp
      .src(config.html.src)
      .pipe($.if(argv.p, $.size({title: 'Html:'})))
      .pipe($.if(argv.p, $.htmlmin(config.htmlmin.options)))
      .pipe($.if(argv.p, $.size({title: 'Minimised:'})))
      .pipe($.if(argv.p, gulp.dest(config.html.dest)))
      .pipe($.if(argv.p, $.gzip(config.gzip.options)))
      .pipe($.if(argv.p, $.size({
        title: 'GZiped:',
        zip: true
      })))
      .pipe($.if(argv.p, gulp.dest(config.html.dest)));

    callback();
  };
};
