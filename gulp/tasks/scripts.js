/**
 * SCRIPTS
 * Tasks for managing javascripts
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
	lazy: true
});

/**
 * CONFIG
 */
var scripts = require('../gulp-config').scripts;
var uglify = require('../gulp-config').uglify;
var gzip = require('../gulp-config').gzip;

gulp.task('scripts', function (){
  return gulp.src(scripts.src)
    .pipe($.if(!argv.prod, $.sourcemaps.init()))
    .pipe($.concat(scripts.filename))
    .pipe($.size({title: 'Concatinated:'}))
    .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
    .pipe($.if(argv.prod, $.uglify(uglify.options)))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.size({title: 'Uglified:'})))
    .pipe(gulp.dest(scripts.dest))
    .pipe($.if(argv.prod, $.gzip(gzip.options)))
    .pipe($.if(argv.prod, $.size({title: 'GZiped:'})))
    .pipe(gulp.dest(scripts.dest));
})
