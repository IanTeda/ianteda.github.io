"use strict";
/**
 * Gulp Clean Task
 * @module clean.task.js
 * @param {directory} directory - What directory are we going to clean
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Clean - Clean directory passed in
 */
module.exports = (directory, $) => {
  return callback => {
    $.del(directory); // Globbing pattern to match everything inside the folder
    callback();
  };
};
