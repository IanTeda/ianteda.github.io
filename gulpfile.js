/**
 * REQUIRE ALL GULP FILES
 * Require all js files in gulp source directory
 * Using gulp v4
 * Loads in gulp plugins using gulp-load-plugins and attaches them variable $.
 */

 var requireDir = require('require-dir');

 // Require all tasks in gulp/tasks, including subfolders
 requireDir('./src/gulp', {
 	recurse: true
 });
