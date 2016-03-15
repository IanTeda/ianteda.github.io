"use strict";
/**
 * Gulp Task for JavaScript Files
 * @module scripts.babel.js
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Plugins lazy loaded by gulp-load-plugins
 * @return {task} Scripts - Task to manage scripts in project
 */

module.exports = function(gulp, config, argv, $) {
  return function(callback) {
    gulp.src(config.scripts.src)
      .pipe($.if(!argv.prod, $.sourcemaps.init()))
      .pipe($.concat(config.scripts.filename))
      .pipe($.size({title: 'Concatinated:'}))
      .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
      .pipe($.size({title: 'Source mapped:'}))
      .pipe($.if(argv.prod, $.uglify(config.uglify.options)))
      .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
      .pipe($.if(argv.prod, $.size({title: 'Uglified:'})))
      .pipe($.if(argv.prod, gulp.dest(config.scripts.dest)))
      .pipe($.if(argv.prod, $.gzip(config.gzip.options)))
      .pipe($.if(argv.prod, $.size({title: 'Ziped:'})))
      .pipe(gulp.dest(config.scripts.dest));
    callback();
  };
};
