"use strict";
/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Scripts - Task to manage scripts in project
 */
module.exports = (gulp, config, argv, $) => {
  return callback => {
    gulp
      // JavaScript source files
      .src(config.scripts.src)
      // Initate sourcemaps if not in production mode
      .pipe($.if(!argv.p, $.sourcemaps.init()))
      // Always concatinate files, order is important
      .pipe($.concat(config.scripts.filename))
      .pipe($.size({title: 'Concatinated:'}))
      // Write source maps for easier debugging in browser
      .pipe($.if(!argv.p, $.sourcemaps.write('./')))
      .pipe($.if(!argv.p, $.size({title: 'Source mapped:'})))
      // Unglify JavaScript (remove unneeded characters)
      .pipe($.if(argv.p, $.uglify(config.uglify.options)))
      // Add min prefix to output
      .pipe($.if(argv.p, $.rename({suffix: '.min'})))
      .pipe($.if(argv.p, $.size({title: 'Uglified:'})))
      // Write stream to destination folder -- make a copy -- before compressing
      .pipe($.if(argv.p, gulp.dest(config.scripts.dest)))
       // Compress stream
      .pipe($.if(argv.p, $.gzip(config.gzip.options)))
      .pipe($.if(argv.p, $.size({title: 'Ziped:'})))
      // Write stream to destination folder
      .pipe(gulp.dest(config.scripts.dest));
    // Let async know things have finished
    callback();
  };
};
