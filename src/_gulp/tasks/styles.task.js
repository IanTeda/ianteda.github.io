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
    // We have a CSS and SASS stream that need to merge into one
    $.merge2(
      gulp
        // CSS Stream
        .src(config.styles.css)
        .pipe($.if(!argv.p, $.sourcemaps.init())),
      gulp
        // SASS Stream
        .src(config.styles.sass)
        .pipe($.if(!argv.p, $.sourcemaps.init()))
        .pipe($.sass({
          precision: 10
        })
        .on('error',
          $.sass.logError
          )
        )
      )
      .pipe($.size({title: 'Merged CSS & SASS streams:'}))
      .pipe($.concat(config.styles.filename))
      .pipe($.if(!argv.p, $.size({title: 'Source Maps Written:'})))
      .pipe($.size({title: 'Concatinated:'}))
      .pipe($.postcss(config.postcss.processors))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.size({title: 'PostCSS:'}))
      .pipe($.if(!argv.p, $.sourcemaps.write('./')))
      .pipe($.if(argv.p, gulp.dest(config.styles.dest)))
      .pipe($.if(argv.p, $.gzip(config.gzip.options)))
      .pipe($.if(argv.p, $.size({title: 'GZiped:'})))
      .pipe(gulp.dest(config.styles.dest));

    // Let async know we have finished
    callback();
  };
};
