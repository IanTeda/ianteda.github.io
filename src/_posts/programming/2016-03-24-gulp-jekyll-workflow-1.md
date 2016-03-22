---
title: Gulp Jekyll Workflow - Part 1 Design Pattern
description: Part 1 - Gulp design pattern for working with Jekyll website generator
date: 2016-03-24
tags: [gulp, jekyll, workflow, design pattern]
layout: post
category: programming
navigation: true
main-header: true
cover: /assets/images/{cover-in-header}.jpg
logo: /assets/images/logo-light.png
---

Putting together my workflow for developing and publishing my Jekyll website I set the following design criteria or patterns:

1. Use ES2015: Use new features before they become mainstream
2. Command Line Interface: Be able to develop in different modes (dev / prod)
3. Configuration File: Store configuration (constants) in seperate file. More readable code
4. Modulised gulp tasks: Makes for more readable, easier to reuse and maintainable code

# 1 - Use ES2015 with Gulpfile.js

With [Babel](https://babeljs.io/) one can use next generation JavaScript, today in [Gulp](http://gulpjs.com/). To ~steal~ use the Babel tag line.
If you have Gulp (gulp-cli) version +3.9 installed then using ES2015 through Babel is as easy as 1-2-3 [^using-es6-with-gulp]

1 - Install npm packages for Babel and babel presents

~~~ Javascript
npm install babel-core babel-preset-es2015 --save-dev
~~~

2 - Create a `.babelrc` file to enable 2015 presets

~~~ Javascript
{
  "presets": ["es2015"]
}
~~~

3 - Rename `gulpfile.js` to 'gulpfile.babel.js`

Done.

How do I check what version of Gulp I have

# 2 - Command Line Interface

Use Yargs

`gulp.babel.js`

~~~ Javascript
// Command line (CLI) argument
var argv = require("./gulp/yargs.config");
~~~

`yargs.config.js`

~~~ JavaScript
/**
 * CLI (YARGS) Configuration
 * @param {yargs} yargs - Module for handling CLI arguments
 * @exports {argv} argv - Argument object
 */
module.exports = require("yargs")
  .usage("Usage: Gulp <task> [-p -prod -production]")
  .command("script", "Run script tasks", {alias: "scripts"})
  .boolean("production")
  .alias("production", ["p", "prod"])
  .describe("production", "Run Gulp tasks in production mode")
  .help("help")
  .alias("help", "?")
  .argv;
~~~

# 3 - Gulp Configuration File

`gulp.babel.js`
~~~Javascript
// Configuration file for gulp tasks
const config = require("./gulp/gulp.config");
~~~

Refractor task configuration

`gulp.config.js`
~~~Javascript
const src = "src/";
const assets = "assets/";
const build = "build/";
const tmp = ".tmp/";
const nodeModules = "node_modules/";
const release = "release";

module.exports = {
  plugin: {
    options: {
      a: true,
      b: false 
    }
  },
  scripts: {
    src: src + assets + "scripts/filename.js"
    dest: tmp + assets + "scripts/"
}
~~~

# 4 - Modulise Gulp Tasks

`gulp.bable.js`

~~~ Javascript
// Import Gulp module
import gulp from "gulp";
// Command line (CLI) argument
var argv = require("./gulp/yargs.config");
// Configuration file for gulp tasks
const config = require("./gulp/gulp.config");
// Lazy load plugins, save on var declaration
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp Task
 * @param {task} task - What Gulp task do you require
 * @return {function} function - Returns task function from module export
 */
function requireTask(task) {
  // Require Gulp task module, passing in Gulp, config, argv and plugin objects
  return require("./gulp/tasks/" + task + ".task.js")(
    gulp,
    config,
    argv,
    plugins
  );
}

gulp.task("scripts:build", requireTask("scripts"));
~~~

`scripts.task.js`

~~~javascript
"use strict";
/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {task} Scripts - Task to manage scripts in project
 */
module.exports = (gulp, config, argv, $) => {
  return callback => {
    gulp
      // JavaScript source files
      .src(config.scripts.src)
      // Initate sourcemaps when not in production mode
      .pipe($.if(!argv.prod, $.sourcemaps.init()))
      // Always concatinate files, order is important
      .pipe($.concat(config.scripts.filename))
      .pipe($.size({title: 'Concatinated:'}))
      // Write source maps when not in production mode for easier debugging in browser
      .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
      .pipe($.if(!argv.prod, $.size({title: 'Source mapped:'})))
      // Unglify JavaScript (remove unneeded characters)
      .pipe($.if(argv.prod, $.uglify(config.uglify.options)))
      // Add min prefix to output
      .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
      .pipe($.if(argv.prod, $.size({title: 'Uglified:'})))
      // Appending content hash to filenames, to force browser cache update
      .pipe($.if(argv.prod, $.rev()))
      .pipe($.if(argv.prod, $.size({title: 'Appended content hash:'})))
      // Write stream to destination folder -- make a copy -- before compressing
      .pipe($.if(argv.prod, gulp.dest(config.scripts.dest)))
       // Compress stream
      .pipe($.if(argv.prod, $.gzip(config.gzip.options)))
      .pipe($.if(argv.prod, $.size({
        title: 'Ziped:',
        gzip: true
      })))
      // Write stream to destination folder
      .pipe(gulp.dest(config.scripts.dest))
      .pipe($.size({title: 'Scripts copied:'}));

    // Let async know things have finished
    callback();
  };
};
~~~

### References (it isn't just my opinion)
[^using-es6-with-gulp]: [Using ES6 with gulp](https://markgoodyear.com/2015/06/using-es6-with-gulp/)
* [Link title](https://davidwalsh.name/nodejs-arguments-yargs)
* [Link title](http://blog.nodejitsu.com/npmawesome-parsing-command-line-options-with-yargs/)
* (http://reverentgeek.com/ahoy-parse-ye-node-js-command-args-with-yargs/)
