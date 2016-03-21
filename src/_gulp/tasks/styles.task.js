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
      // Concatinate css, since order is important
      .pipe($.concat(config.styles.filename))
      .pipe($.size({title: 'Concatinated:'}))
      // Apply PostCSS processors to the stream
      .pipe($.postcss(config.postcss.processors))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.size({title: 'PostCSS:'}))
      // Write source maps for easier debuging, since we are concatinating
      .pipe($.if(!argv.p, $.sourcemaps.write('./')))
      .pipe($.if(!argv.p, $.size({title: 'Source Maps Written:'})))
      // Appending content hash to filenames, to force browser cache update
      .pipe($.if(argv.prod, $.rev()))
      .pipe($.if(argv.p, $.size({title: 'Appended content hash:'})))
      // Write stream (copy) to drive before we zip
      .pipe($.if(argv.p, gulp.dest(config.styles.dest)))
      // Zip stream for faster transfer
      .pipe($.if(argv.p, $.gzip(config.gzip.options)))
      .pipe($.if(argv.p, $.size({
        title: 'GZiped:',
        gzip: true
      })))
      // Write stream to drive
      .pipe(gulp.dest(config.styles.dest))
      .pipe($.size({title: 'Styles copied:'}));

    // Let async know we have finished
    callback();
  };
};
