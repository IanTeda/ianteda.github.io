"use strict";
/**
 * Gulp Task for JavaScript Files
 * @module gulp.scripts.task.js
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Plugins lazy loaded by gulp-load-plugins
 * @return {task} Scripts - Task to manage scripts in project
 */
module.exports = function(gulp, config, argv, $) {
  const scripts = config.scripts;
  const uglify = config.uglify;
  const gzip = config.gzip;

  return function() {
    gulp.src(scripts.src)
      .pipe($.if(!argv.prod, $.sourcemaps.init()))
      // .pipe(babel({ presets: ['es2015'] })) // Transpile ES2015 JavaScript
      .pipe($.concat(scripts.filename))
      .pipe($.size({title: 'Concatinated:'}))
      .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
      .pipe($.if(argv.prod, $.uglify(uglify.options)))
      .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
      .pipe($.if(argv.prod, $.size({title: 'Uglified:'})))
      .pipe($.if(argv.prod, gulp.dest(scripts.dest)))
      .pipe($.if(argv.prod, $.gzip(gzip.options)))
      .pipe($.if(argv.prod, $.size({title: 'GZiped:'})))
      .pipe(gulp.dest(scripts.dest));
  };
};
