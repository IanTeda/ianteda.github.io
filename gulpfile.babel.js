"use strict";
// Ref http://macr.ae/article/splitting-gulpfile-multiple-files.html

import gulp from "gulp";
var argv = require("./src/_gulp/yargs.config");
const config = require("./src/_gulp/gulp.config");
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp task
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

gulp.task("scripts:clean", requireCleanTask(config.scripts.dest));
gulp.task("scripts:build", requireTask("scripts"));
gulp.task("scripts", gulp.series("scripts:clean", "scripts:build"));
