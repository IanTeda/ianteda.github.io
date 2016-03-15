"use strict";
// Ref http://macr.ae/article/splitting-gulpfile-multiple-files.html

import gulp from "gulp";
import argv from "./src/_gulp/gulp.yargs.help";
const config = require("./src/_gulp/gulp.config");
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp task
 * @return {task} task - Return back function exported from task module
 * @param {gulp} gulp - Pass in Gulp
 * @param {config} config - Pass in Gulp config
 * @param {argv} argv - Pass in arguments set at CLI
 * @param {plugins} plugins - Pass in gulp-load-plugins
 */
function getTask(task) {
  return require("./src/_gulp/tasks/gulp." + task + ".task.js")(
    gulp,
    config,
    argv,
    plugins
  );
}

gulp.task('scripts', getTask('scripts'));
