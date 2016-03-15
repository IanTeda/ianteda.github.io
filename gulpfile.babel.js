"use strict";
// Ref http://macr.ae/article/splitting-gulpfile-multiple-files.html

import gulp from "gulp";
import argv from "./src/_gulp/gulp.yargs.help";
const config = require("./src/_gulp/gulp.config");
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp task
 * @param {task} task - What Gulp task do you require
 * @return {function} function - Returns task function from module export
 */
function requireTask(task) {
  // Require Gulp task file, passing in Gulp, config, argv and plugin objects
  return require("./src/_gulp/tasks/" + task + ".babel.js")(
    gulp,
    config,
    argv,
    plugins
  );
}

gulp.task('scripts', requireTask("scripts"));
