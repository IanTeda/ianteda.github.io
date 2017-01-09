"use strict";
/**
 * Gulp Jekyll Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage HTML in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    var stream = gulp
      .src(config.html.src)
      .pipe($.if(argv.prod, $.size({title: 'Html:'})))
      .pipe($.if(argv.prod, $.htmlmin(config.htmlmin.options)))
      .pipe($.if(argv.prod, $.size({title: 'Minimised:'})))
      .pipe($.if(argv.prod, gulp.dest(config.html.dest)))
      .pipe($.if(argv.prod, $.gzip(config.gzip.options)))
      .pipe($.if(argv.prod, $.size({
        title: 'GZiped:',
        zip: true
      })))
      .pipe($.if(argv.prod, gulp.dest(config.html.dest)));

    return stream;
  };
};
