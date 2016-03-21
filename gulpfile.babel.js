"use strict";
// Ref http://macr.ae/article/splitting-gulpfile-multiple-files.html

import gulp from "gulp";
var argv = require("./src/_gulp/yargs.config");
const config = require("./src/_gulp/gulp.config");
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp Task
 * @param {task} task - What Gulp task do you require
 * @return {function} function - Returns task function from module export
 */
function requireTask(task) {
  // Require Gulp task module, passing in Gulp, config, argv and plugin objects
  return require("./src/_gulp/tasks/" + task + ".task.js")(
    gulp,
    config,
    argv,
    plugins
  );
}

/**
 * Require Gulp Clean Task
 * @param {directory} directory - What directory do you want cleaned
 * @return {function} function - Returns task function from moudle export
 */
function requireCleanTask(directory) {
  // Require gulp task module
  return require("./src/_gulp/tasks/clean.task")(
    directory,
    plugins
  );
}

/**
 * Require Gulp Inject Task
 * @param {target} target - What html file do we want to inject reference
 * @param {references} references - What files to we want to reference
 * @return {function} function - Returns task function from module export
 */
function requireInjectTask(target, references, destination) {
  // Require gulp task module
  return require("./src/_gulp/tasks/inject.task")(
    target,
    references,
    destination,
    gulp,
    config,
    plugins
  );
}

/**
 * Scripts Tasks
 * Usage: gulp scripts:clean - Clean main.js from the JavaScripts build folder
 * Usage: gulp scripts:build - Build main.js from source into build folder
 * Usage: gulp scripts - Clean build folder, then build from source into build folder
*/
gulp.task("scripts:clean", requireCleanTask(config.scripts.dest + "/**/*"));
gulp.task("scripts:build", requireTask("scripts"));
gulp.task("scripts", gulp.series("scripts:clean", "scripts:build"));

/**
 * Styles Tasks
 * Usage: gulp styles:clean - Clean main.css from styles build folder
 * Usage: gulp styles:build - Build main.css from source into build folder
 * Usage: gulp styles - Clean build folder, then build from source into build folder
*/
gulp.task("styles:clean", requireCleanTask(config.styles.dest + "/**/*"));
gulp.task("styles:build", requireTask("styles"));
gulp.task("styles", gulp.series("styles:clean", "styles:build"));

/**
 * Styles Tasks
 * Usage: gulp styles:clean - Clean main.css from styles build folder
 * Usage: gulp styles:build - Build main.css from source into build folder
 * Usage: gulp styles - Clean build folder, then build from source into build folder
*/
gulp.task("fonts:clean", requireCleanTask(config.fonts.dest + "/**/*"));
gulp.task("fonts:build", requireTask("fonts"));
gulp.task("fonts", gulp.series("fonts:clean", "fonts:build"));

/**
 * Jekyll Tasks
 * Usage: gulp jekyll:clean - Clean generated pages from build folder
 * Usage: gulp jekyll:build - Build generated pages
 * Usage: gulp jekyll - Clean build folder, then build generated pages from source
*/
gulp.task("jekyll:clean", requireCleanTask(config.jekyll.dest + "/**/*"));
gulp.task("jekyll:build", requireTask("jekyll"));
gulp.task("jekyll", gulp.series("jekyll:clean", "jekyll:build"));

/**
 * HTML Tasks
 * Usage: gulp html:clean - Clean zipped pages from build folder
 * Usage: gulp html:build - Build minified and zipped pages
 * Usage: gulp html - Clean build folder, then minify and zip pages from source
*/
gulp.task("html:clean", requireCleanTask(config.jekyll.dest + "/**/*.{html,gz}"));
gulp.task("html:build", requireTask("html"));
gulp.task("html", gulp.series("html:clean", "html:build"));

/**
 * Images Tasks
 * Usage: gulp images:clean - Clean images from build folder
 * Usage: gulp images:build - Copy and minify images to build folder
 * Usage: gulp images - Clean build folder, then minify and copy images to build folder
*/
gulp.task("images:clean", requireCleanTask(config.images.dest + "/**/*"));
gulp.task("images:build", requireTask("images"));
gulp.task("images", gulp.series("images:clean", "images:build"));

gulp.task("inject:scripts", requireInjectTask(config.inject.scripts.target, config.inject.scripts.references, config.inject.scripts.destination));
gulp.task("inject:styles", requireInjectTask(config.inject.styles.target, config.inject.styles.references, config.inject.styles.destination));
gulp.task("inject", gulp.parallel("inject:scripts", "inject:styles"));
