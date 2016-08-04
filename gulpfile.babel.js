"use strict";

// Import Gulp module
import gulp from "gulp";
// BrowserSync is used to live-reload your website
import browserSync from "browser-sync";
// Command line (CLI) argument
var argv = require("./gulp/yargs.config");
// Configuration file for gulp tasks
const config = require("./gulp/gulp.config");
// Lazy load plugins, save on var declaration
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp Task
 * @param {task} task - What Gulp task do you require
 * @return {function} function - Returns task function from module export
 */
function requireTask(task) {
  // Require Gulp task module, passing in Gulp, config, argv and plugin objects
  return require("./gulp/tasks/" + task + ".task.js")(
    gulp,
    config,
    argv,
    plugins
  );
}

/**
 * Require Gulp Clean Task
 * @param {directory} directory - What directory do you want cleaned
 * @return {function} function  - Returns task function from moudle export
 */
function requireCleanTask(directory) {
  // Require gulp task module
  return require("./gulp/tasks/clean.task")(
    directory,
    plugins
  );
}

/**
 * Require Gulp Inject Task
 * @param {target} target           - What html file do we want to inject reference
 * @param {references} references   - What files to we want to reference
 * @param {destination} destination - Where does the inject file go
 * @return {function} function      - Returns task function from module export
 */
function requireInjectTask(target, references, destination) {
  // Require gulp task module
  return require("./gulp/tasks/inject.task")(
    target,
    references,
    destination,
    gulp,
    config,
    plugins
  );
}

/**
 * Require Gulp Copy Task
 * @param {source} source - Source files to be copied
 * @param {destination} destination - Destination folder to copy files into
 * @return {function} function - Returns task function from module export
 */
function requireCopyTask(source, destination) {
  // Require gulp task module
  return require("./gulp/tasks/copy.task")(
    source,
    destination,
    gulp,
    config,
    plugins
  );
}

/**
 * Scripts Tasks
 * Usage: gulp scripts:clean  - Clean main.js from the JavaScripts build folder
 * Usage: gulp scripts:build  - Build main.js from source into build folder
 * Usage: gulp scripts        - Clean build folder, then build from source into build folder
*/
gulp.task(
  "scripts:clean",
  requireCleanTask(
    config.scripts.dest + "/**/*"
  )
);
gulp.task(
  "scripts:build",
  requireTask(
    "scripts"
  )
);
gulp.task(
  "scripts",
  gulp.series(
    "scripts:clean",
    "scripts:build"
  )
);

/**
 * Styles Tasks
 * Usage: gulp styles:clean - Clean main.css from styles build folder
 * Usage: gulp styles:build - Build main.css from source into build folder
 * Usage: gulp styles       - Clean build folder, then build from source into build folder
*/
gulp.task(
  "styles:clean",
  requireCleanTask(
    config.styles.dest + "/**/*"
  )
);
gulp.task(
  "styles:build",
  requireTask(
    "styles"
  )
);
gulp.task(
  "styles",
  gulp.series(
    "styles:clean",
    "styles:build"
  )
);

/**
 * Styles Tasks
 * Usage: gulp styles:clean - Clean main.css from styles build folder
 * Usage: gulp styles:build - Build main.css from source into build folder
 * Usage: gulp styles       - Clean build folder, then build from source into build folder
*/
gulp.task(
  "fonts:clean",
  requireCleanTask(
    config.fonts.dest + "/**/*.{eot,svg,ttf,woff,woff2,otf}"
  )
);
gulp.task(
  "fonts:build",
  requireTask(
    "fonts"
  )
);
gulp.task(
  "fonts",
  gulp.series(
    "fonts:clean",
    "fonts:build"
  )
);

/**
 * Jekyll Tasks
 * Usage: gulp jekyll:clean - Clean generated pages from build folder
 * Usage: gulp jekyll:build - Build generated pages
 * Usage: gulp jekyll       - Clean build folder, then build generated pages from source
*/
gulp.task(
  "jekyll:clean",
  requireCleanTask(
    config.jekyll.dest + "/**/*"
  )
);
gulp.task(
  "jekyll:build",
  requireTask(
    "jekyll"
  )
);
gulp.task(
  "jekyll",
  gulp.series(
    "jekyll:clean",
    "jekyll:build"
  )
);

/**
 * HTML Tasks
 * Usage: gulp html:clean - Clean zipped pages from build folder
 * Usage: gulp html:build - Build minified and zipped pages
 * Usage: gulp html       - Clean build folder, then minify and zip pages from source
*/
gulp.task(
  "html:cleanGZips",
  requireCleanTask(
    config.jekyll.dest + "/**/*.gz"
  )
);
gulp.task(
  "html:build",
  requireTask(
    "html"
  )
);
gulp.task(
  "html",
  gulp.series(
    "html:cleanGZips",
    "html:build"
  )
);

/**
 * Images Tasks
 * Usage: gulp images:clean - Clean images from build folder
 * Usage: gulp images:build - Copy and minify images to build folder
 * Usage: gulp images       - Clean build folder, then minify and copy images to build folder
*/
gulp.task(
  "images:clean",
  requireCleanTask(
    config.images.dest + "/**/*.{png,gif,jpg}"
  )
);
gulp.task(
  "images:build",
  requireTask(
    "images"
  )
);
gulp.task(
  "images",
  gulp.series(
    "images:clean",
    "images:build"
  )
);

/**
 * Download Tasks
 * Usage: gulp downloads:clean - Clean downlaods from build folder
 * Usage: gulp downloads:build - Copy downloads to build folder
 * Usage: gulp downloads       - Clean build folder, then copy downloads to build folder
*/
gulp.task(
  "downloads:clean",
  requireCleanTask(
    config.downloads.dest + "/**/*"
  )
);
gulp.task(
  "downloads:build",
  requireTask(
    "downloads"
  )
);
gulp.task(
  "downloads",
  gulp.series(
    "downloads:clean",
    "downloads:build"
  )
);

/**
 * Inject Tasks
 * Usage: gulp inject:scripts - Inject scripts into scripts.html
 * Usage: gulp inject:styles  - Inject styles into styles.html
 * Usage: gulp inject         - Inject scripts and styles into Jekyll include files
*/
gulp.task(
  "inject:scripts",
  requireInjectTask(
    config.inject.scripts.target,
    config.inject.scripts.references,
    config.inject.scripts.destination
  )
);
gulp.task(
  "inject:styles",
  requireInjectTask(
    config.inject.styles.target,
    config.inject.styles.references,
    config.inject.styles.destination
  )
);
gulp.task(
  "inject",
  gulp.parallel(
    "inject:scripts",
    "inject:styles"
  )
);

/**
 * GitHub Pages
 * usage: gulp gh-pages - Push files to GitHub registry
 */
gulp.task(
  "gh-pages",
  requireTask("gh-pages")
);

/**
 * Assets Tasks
 * Usage: gulp copyAssetsToBuild:clean        - Delete all files in build (assets) destination folder
 * Usage: gulp copyAssetsToBuild:scripts      - Copy JavaScript files into build destination folder
 * Usage: gulp copyAssetsToBuild:styles       - Copy CSS files into build destination folder
 * Usage: gulp copyAssetsToBuild:image        - Copy png, gif & jpg files into build destination folder
 * Usage: gulp copyAssetsToBuild:fonts        - Copy eot, svg, ttf, woff, woff2 & otf files into build destination folder
 * Usage: gulp copyAssetsToBuild:downloads    - Copy files in download into build destination folder
 * Usage: gulp copyAssetsToBuild:scripts      - Copy JavaScript files into build destination folder
*/
gulp.task(
  "copyAssetsToBuild:clean",
  requireCleanTask(
    config.jekyll.assets)
);
gulp.task(
  "copyAssetsToBuild:scripts",
  requireCopyTask(
    config.jekyll.tmp + "/scripts/**/*.{js,gz}",
    config.jekyll.assets + "/scripts")
);
gulp.task(
  "copyAssetsToBuild:styles",
  requireCopyTask(
    config.jekyll.tmp + "/styles/**/*.{css,gz}",
    config.jekyll.assets + "/styles")
);
gulp.task(
  "copyAssetsToBuild:images",
  requireCopyTask(
    config.jekyll.tmp + "/images/**/*.{png,gif,jpg}",
    config.jekyll.assets + "/images")
);
gulp.task(
  "copyAssetsToBuild:fonts",
  requireCopyTask(
    config.jekyll.tmp + "/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}",
    config.jekyll.assets + "/fonts")
);
gulp.task(
  "copyAssetsToBuild:downloads",
  requireCopyTask(
    config.jekyll.tmp + "/downloads/**/*",
    config.jekyll.assets + "/downloads")
);
gulp.task("copyAssetsToBuild",
  gulp.series(
    "copyAssetsToBuild:clean",
    gulp.parallel(
      "copyAssetsToBuild:scripts",
      "copyAssetsToBuild:styles",
      "copyAssetsToBuild:images",
      "copyAssetsToBuild:fonts",
      "copyAssetsToBuild:downloads")
  )
);

/**
 * Gulp Serve
 * Usage: gulp serve - Start BrowserSync and start watching for file changes
 */
gulp.task("serve", () => {
  // What directory are we starting browserSync in
  var baseDir = config.browserSync.development;
  if (argv.p) {
    baseDir = config.browserSync.production;
  }

  // Start browserSync
  browserSync({
    // files: ['./src/**', './tmp/**'],
    server: baseDir
  });

  // Watch for Jekyll file changes
  gulp.watch(
    [
      "src/**/*.md",
      "src/**/*.html",
      "src/**/*.yml",
      "src/**/*.xml",
      "src/**/*.txt"
    ]
  ).on("change", gulp.series(
    "jekyll:build",
    browserSync.reload
  ));

  // Watch for Script changes
  gulp.watch(
    "src/assets/scripts/**/*.js"
  ).on("change", gulp.series(
    "scripts",
    browserSync.reload
  ));

  // Watch for Styles changes
  gulp.watch(
    [
      "src/assets/sass/**/*.scss",
      "src/assets/styles/**/*.css"
    ]
  ).on("change", gulp.series(
      "styles",
      browserSync.reload
  ));

  // Watch for image changes
  gulp.watch(
    "src/assets/images/**/*"
  ).on("change", gulp.series(
      "images:build",
      browserSync.reload
  ));
});

/**
 * Gulp Default
 * Usage: gulp - Compile styles, scripts, images and fonts. Then inject references, build jekyll and server up.
 */
gulp.task("default",
  gulp.series(
    gulp.parallel("downloads", "styles", "scripts", "images:build", "fonts:build"),
    gulp.series(
      "inject",
      "jekyll:build",
      "serve"
    )
  )
);

/**
 * Gulp Build
 * Usage: gulp build -prod - Compile styles, scripts, images and fonts. Then inject references, build jekyll compress html and copy assets to build folder.
 */
gulp.task("build",
  gulp.series(
    gulp.parallel("downloads", "styles", "scripts", "images:build", "fonts:build"),
    gulp.series(
      "inject",
      "jekyll:build",
      "html",
      "copyAssetsToBuild"
    )
  )
);

/**
 * Gulp testProd
 * Usage: gulp testProd -prod - Run build for production
 */
gulp.task("testProd",
  gulp.series(
    gulp.parallel("downloads", "styles", "scripts", "images:build", "fonts:build"),
    gulp.series(
      "inject",
      "jekyll:build",
      "html",
      "copyAssetsToBuild",
      "serve"
    )
  )
);

/**
 * Gulp deploy
 * Usage: gulp deploy -prod - Build website and push to Github
 */
gulp.task(
  "deploy",
  gulp.series("build", "gh-pages")
);

gulp.task(
  "clean",
  gulp.series("copyAssetsToBuild:clean", "html:cleanGZips", "jekyll:clean")
);

gulp.task(
  "jsdocs",
  requireTask("jsdocs")
);
