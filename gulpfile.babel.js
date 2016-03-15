"use strict";
// Ref http://macr.ae/article/splitting-gulpfile-multiple-files.html

import gulp from "gulp";
import argv from "./src/_gulp/gulp.yargs.help";
const config = require("./src/_gulp/gulp.config");
const loadPlugins = config.gulpLoadPlugins;
var plugins = require("gulp-load-plugins")(loadPlugins.options);

function getTask(task) {
  return require("./src/_gulp/tasks/gulp.${task}.task.js")(gulp, config, argv, plugins);
}

gulp.task('scripts', getTask('scripts'));