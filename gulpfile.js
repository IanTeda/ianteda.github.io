/**
 * REQUIRE ALL GULP FILES
 * Require all js files in gulp source directory
 * Forward reference tasks in other files
 * Using gulp v4
 */

 var gulp = require('gulp');
 var requireDir = require('require-dir');
 var FwdRef = require('undertaker-forward-reference');

/**
 * FOWARD REFERENCE
 * We are running a script, so we cannot call tasks from files not required yet
 */
gulp.registry(FwdRef());

 // Require all tasks in gulp/tasks, including subfolders
 requireDir('./gulp', {
 	recurse: true
 });
