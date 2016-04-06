---
title: Gulp Jekyll Workflow - Part 1 Design Pattern
description: Part 1 - Gulp design pattern for working with Jekyll website generator
date: 2016-03-24
tags: [gulp, jekyll, workflow, design pattern]
layout: post
category: programming
navigation: true
main-header: true
cover: /assets/images/cover-code-gulp.jpg
logo: /assets/images/logo-light.png
---

> Always start with the end in mind. So you know what direction to travel<br/>
> <cite> — Ian Teda </cite>

Keeping the end in mind, I listed four design criteria (patterns) to target when writting Gulp tasks. I wanted my workflow to be modern, simple, configurable and modulised.

**Design Criteria/Patterns**

1. Use ES2015, ECMAScript 2015 (modern): Why? Get accustom to new JavaScript features before they become mainstream.
2. Command Line Interface (simple): Why? KISS. Keep It Simple Stupid. A good design is a simple yet functional design.
3. Configuration File (configurable): Why? Make changes in one place, watch them permiate. Easier to read and maintain code.
4. Modulised Gulp tasks: Why? Makes for more readable, easier to reuse and maintainable code.

## 1 - Use [ES2015](http://www.ecma-international.org/ecma-262/6.0/) with [Gulp](http://gulpjs.com/)

To paraphrase the Babel tagline. Use next generation JavaScript, today with [Babel](https://babeljs.io/). Since the release of Gulp (gulp-cli) version +3.9 `gulp -v` it is as easy as 1-2-3 to use ES2015 while writting Gulp tasks [^using-es6-with-gulp].

To get babel plugged into Gulp I used the following 3 steps:

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

Done. See, as easy as 1-2-3.

## 2 - Command Line Interface with [Yargs](http://yargs.js.org/)

Paraphrasing the [Yargs](http://yargs.js.org/) tagline. Build interactive command line tools by parsing arguments and generating an elegant user interface. Keeping with my design criteria, I refractored the Yargs configuration into a seperate config file `yargs.config.js`. Which is then required from within the `gulpfile.babel.js`. Keeping things neat and tidy.

Require Yargs configuration file within `gulpfile.babel.js`.

~~~javascript
// Command line (CLI) argument
var argv = require("./gulp/yargs.config");
~~~

Setup the user interface and configure the CLI arguments `yargs.config.js` [^node-command-args].

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

Make changes in one place, watch them permiate. Which equals easier to read and maintain code.

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

Modulisation of Gulp tasks makes for more readable, easier to reuse and maintain code.

Always abstract anything you need to do more than once. With that in mind a requireTask function is used to require task files from within `gulp.babel.js`. [^module-gulp-tasks]

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
  // Require Gulp task module, passing in Gulp, config, argv and plugin object references
  return require("./gulp/tasks/" + task + ".task.js")(
    gulp,
    config,
    argv,
    plugins
  );
}

gulp.task("scripts:build", requireTask("nameOfTask"));
~~~

The task `./gulp/tasks/nameOfTask.task.js` is built up using the [NodeJS](https://nodejs.org/) module pattern, returing the task stream. Returning the task stream is important as it allows Gulp to signal async task completion. With task configuration from withing the `gulp.config.js` file.

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

## 5 - Just Show Me the Repository Already
If you would like to see it in action, check out the repositry for this website at [https://github.com/IanTeda/IanTeda.github.io](https://github.com/IanTeda/IanTeda.github.io)

##### Footnotes
[^using-es6-with-gulp]: [Using ES6 with gulp](https://markgoodyear.com/2015/06/using-es6-with-gulp/)
[^module-gulp-tasks]: [Splitting a gulpfile into multiple files](http://macr.ae/article/splitting-gulpfile-multiple-files.html)
[^node-command-args]: [Parse ye Node.js command args with yargs!](http://reverentgeek.com/ahoy-parse-ye-node-js-command-args-with-yargs/)
