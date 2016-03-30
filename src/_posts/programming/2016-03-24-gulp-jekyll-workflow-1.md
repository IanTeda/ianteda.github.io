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

> Always start with the end in mind, so you know what direction to travel<br/>
> <cite> — Ian Teda </cite>

Keeping the end in mind, I listed out four design criteria/patterns to target when writting my Gulp tasks. I wanted my workflow to be modern, flexibile with help, configurable and modulised.

**Design Criteria/Patterns**

1. Use ES2015 (modern): Why? Use new features before they become mainstream
2. Command Line Interface (flexible with help): Why? Be able to develop in different modes (dev / prod)
3. Configuration File (configurable): Why? Store configuration (constants) in seperate file. More readable code
4. Modulised gulp tasks: Why? Makes for more readable, easier to reuse and maintainable code

## 1 - Use ES2015 with Gulpfile.js

With the use of [Babel](https://babeljs.io/) one can use next generation JavaScript, today in [Gulp](http://gulpjs.com/). To ~steal~ use the Babel tag line.
If you have Gulp (gulp-cli) version +3.9 installed then using ES2015 through Babel is as easy as 1-2-3 [^using-es6-with-gulp]

1 - Install npm packages for Babel and babel presents

~~~javascript
npm install babel-core babel-preset-es2015 --save-dev
~~~

2 - Create a `.babelrc` file to enable 2015 presets

~~~javascript
{
  "presets": ["es2015"]
}
~~~

3 - Rename `gulpfile.js` to `gulpfile.babel.js`

Done.

How do I check what version of Gulp I have

## 2 - Command Line Interface

Use Yargs

`gulp.babel.js`

~~~javascript
// Command line (CLI) argument
var argv = require("./gulp/yargs.config");
~~~

`yargs.config.js`

~~~javascript
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

## 3 - Gulp Configuration File

`gulp.babel.js`

~~~javascript
// Configuration file for gulp tasks
const config = require("./gulp/gulp.config");
~~~


`gulp.config.js`

~~~javascript
module.exports = {
  xyz: {
    src: "src/xyz.xyz",
    options: {
      a: true,
      b: false 
    },
    dest: "src/"
  }
}
~~~

## 4 - Modulise Gulp Tasks

`gulp.bable.js`

~~~javascript
// Import Gulp module
import gulp from "gulp";
// Command line (CLI) argument
var argv = require("./gulp/yargs.config");
// Configuration file for gulp tasks
const config = require("./gulp/gulp.config");
// Lazy load plugins, makes for neater source code
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

`nameOfTask.task.js`

~~~javascript
"use strict";
/**
 * Gulp Task for doing XYZ
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage XYZ in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    var stream = gulp
      // XYZ source files
      .src(config.xyz.src)
      // Apply special Gulp source
      .pipe($.if(
        !argv.prod, 
        $.specialsource(config.specialsource.options
      )
      // Write stream to destination folder
      .pipe(gulp.dest(config.xyz.dest));
      
    return stream;
  };
};
~~~

### References (it isn't just my opinion)
[^using-es6-with-gulp]: [Using ES6 with gulp](https://markgoodyear.com/2015/06/using-es6-with-gulp/)
* [Link title](https://davidwalsh.name/nodejs-arguments-yargs)
* [Link title](http://blog.nodejitsu.com/npmawesome-parsing-command-line-options-with-yargs/)
* (http://reverentgeek.com/ahoy-parse-ye-node-js-command-args-with-yargs/)
