/**
 * REQUIRE ALL GULP FILES
 * Require all js files in gulp source directory
 * Using gulp v4
 */

 var requireDir = require('require-dir');

 // Require all tasks in gulp/tasks, including subfolders
 requireDir('./gulp', {
 	recurse: true
 });
