---
title: Using Gulp with Jekyll
date: 2016-01-15
tags: [gulp, jekyll]
lead: This is an excerpt or lead for this article
subclass: 'post tag-speeches'
layout: post
category: programming
navigation: True
cover: 'assets/images/cover-gulp.jpg'
logo: 'assets/images/logo-light.png'
---

### Structure

1. Development
2. Build
3. Deployment

### Development

* Images
  - Copy images from source to temporary folder for serve, but only those changed or new
* Scripts
  - Concatinate
  - Sourcemaps
* Styles
  - Concatinate
  - Sourcemaps
* Inject
  - Styles
  - Scripts
* Fonts
  - Copy
  - Flatten folder structure

##### Images Task
```
/**
 * IMAGES
 * Lazy load gulp plugins using gulp-load-plugins and attaches them variable $.
 * Copy changed files into .tmp folder
 * --prod optimises images with imagemin
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
var images = require('../gulp-config').images;
var imagemin = require('../gulp-config').imagemin;

 /**
  * IMAGES TASK
  */
gulp.task('images', function () {
  return gulp.src(images.src)
		.pipe($.if(!argv.prod, $.changed(images.dest)))
		.pipe($.size({title: 'Images:'}))
    .pipe($.if(argv.prod, $.cache($.imagemin(imagemin.options))))
    .pipe($.if(argv.prod, $.size({title: 'Optimised:'})))
		.pipe(gulp.dest(images.dest));
})
```

##### Scripts Task
```
/**
 * SCRIPTS
 * Lazy load gulp plugins using gulp-load-plugins and attaches them variable $.
 * Create a sourcemap of each javascript file, concatinate, ungilify
 * --prod will skip the sourcemaps, uglify (minimise), add a min suffix and create a gziped copy
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
    .pipe($.if(argv.prod, gulp.dest(scripts.dest)))
    .pipe($.if(argv.prod, $.gzip(gzip.options)))
    .pipe($.if(argv.prod, $.size({title: 'GZiped:'})))
    .pipe(gulp.dest(scripts.dest));
})
```

##### Inject
```
/**
 * INJECT
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Inject styles and scripts into include files, ignoring the .tmp/ folder in path
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del'],
 lazy: true
});

/**
 * CONFIG
 */
var inject = require('../gulp-config').inject;
var scripts = require('../gulp-config').scripts;
var styles = require('../gulp-config').styles;


/**
 * INJECT STYLE SHEETS
 * Inject style sheet reference into _includes/styles.html
 */
gulp.task('inject:styles', function () {
  return gulp.src(styles.inject.target)
    .pipe($.inject(gulp.src(styles.inject.files, inject.options), {
      ignorePath: '.tmp/',
    }))
    .pipe(gulp.dest(styles.inject.dest));
});


/**
 * INJECT SCRIPTS
 * Inject javascript reference into _includes/scripts.html
 */
gulp.task('inject:scripts', function () {
  return gulp.src(scripts.inject.target)
    .pipe($.inject(gulp.src(scripts.inject.files, {
      read: false
    }), {
      ignorePath: '.tmp/',
    }))
    .pipe(gulp.dest(scripts.inject.dest));
});

/**
 * INJECT
 */
gulp.task('inject', gulp.parallel('inject:styles', 'inject:scripts'));
```

##### Html
```
/**
 * HTML
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Default the task do not do anything
 * --prod will uglify (minimise) html files and create a gziped copy
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del']
});

/**
 * CONFIG
 */
var html = require('../gulp-config').html;
var gzip = require('../gulp-config').gzip;
var htmlmin = require('../gulp-config').htmlmin;

/**
 * OPTIMISE HTML
 */
gulp.task('html', function() {
  return gulp.src(html.optimise)
    .pipe($.if(argv.prod, $.size({title: 'Html:'})))
    .pipe($.if(argv.prod, $.htmlmin(htmlmin.options)))
    .pipe($.if(argv.prod, $.size({title: 'Minimised:'})))
    .pipe($.if(argv.prod, gulp.dest(html.dest)))
    .pipe($.if(argv.prod, $.gzip(gzip.options)))
    .pipe($.if(argv.prod, $.size({title: 'GZiped:'})))
    .pipe($.if(argv.prod, gulp.dest(html.dest)));
});
```

##### Fonts
```
/**
 * FONTS
 * Lazy load gulp plugins using gulp-load-plugins and attach them variable $.
 * Collect all fonts and copy only changed fonts into assets fonts folder, flattening any folder hierarchy
 * --prod will do the same as above
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del']
});

/**
 * CONFIG
 */
var fonts = require('../gulp-config').fonts;

/**
 * COPY FONTS
 * Flatten folder structure
 * Copy only fonts that have changed into destination folder
 */
gulp.task('fonts', function () {
  return gulp.src(fonts.src)
    .pipe($.changed(fonts.dest))
    .pipe($.flatten())
    .pipe(gulp.dest(fonts.dest))
    .pipe($.size({
      title: 'Fonts size:',
      showFiles: false
    }));
});
```

##### Browser Sync
```
/**
 * BROWSERSYNC
 * Start browsersync
 * --prod will start browsersync from build directory only
 */

/**
 * REQUIRES
 */
var gulp = require('gulp');
var argv = require('yargs').argv;
var browsersync = require('browser-sync');
var reload = browsersync.reload;


/**
 * BROWSERSYNC
 */
gulp.task('browsersync', function() {

  if (argv.prod){
    var baseDir = ['build'];
  } else {
    var baseDir = ['.tmp', 'build'];
  }

  browsersync({
    server: {
      baseDir: baseDir
    }
  });

  // Watch files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('jekyll', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('jekyll', reload));
  gulp.watch('src/assets/scripts/**/*.js', gulp.series('scripts', reload));
  gulp.watch(['src/assets/scss/**/*.scss', 'src/assets/styles/**/*.css'], gulp.series('styles', reload));
  gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
});
```

##### Github Pages
```
/**
 * GITHUB PAGES
 * Deploy generated pages to Github
 */

/**
 * CONFIG
 */
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

/**
 * CONFIG
 */
var jekyll = require('../gulp-config').jekyll;

/**
 * GITHUB PAGES
 */
gulp.task('gh-pages', function() {
  return gulp.src(jekyll.deploy)
    .pipe(ghPages({
      branch: 'master'
    }));
});
```

### Production

* Images
  - Clean: Clean temporary folder of images
  - Copy: Copy images from source to temporary folder for serve
  - Watch: Watch image folder for changes and copy changed images to temporary folder
  - Optimise: Optimise images in temporary folder
