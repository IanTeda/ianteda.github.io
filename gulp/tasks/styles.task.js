"use strict";
/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage Style Sheets in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    // We have a CSS and SASS stream that need to merge into one
    var stream = $.merge2(
      gulp
        // CSS Stream
        .src(config.styles.css)
        .pipe($.if(!argv.prod, $.sourcemaps.init())),
      gulp
        // SASS Stream
        .src(config.styles.sass)
        .pipe($.if(!argv.prod, $.sourcemaps.init()))
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
      .pipe($.size({title: 'Concatinated Styles:'}))
      // Apply PostCSS processors to the stream
      .pipe($.postcss(config.postcss.processors))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.size({title: 'PostCSS Styles:'}))
      // Write source maps for easier debuging, since we are concatinating
      .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
      .pipe($.if(!argv.prod, $.size({title: 'Styles Source Maps Written:'})))
      // Appending content hash to filenames, to force browser cache update
      .pipe($.if(argv.prod, $.rev()))
      .pipe($.if(argv.prod, $.size({title: 'Appended content hash to main.css:'})))
      // Write stream (copy) to drive before we zip
      .pipe($.if(argv.prod, gulp.dest(config.styles.dest)))
      // Zip stream for faster transfer
      .pipe($.if(argv.prod, $.gzip(config.gzip.options)))
      .pipe($.if(argv.prod, $.size({
        title: 'GZiped Styles:',
        gzip: true
      })))
      // Write stream to drive
      .pipe(gulp.dest(config.styles.dest))
      .pipe($.size({title: 'Styles copied:'}));

    return stream;
  };
};
