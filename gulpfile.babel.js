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
