"use strict";

const src = "src/";
const assets = "assets/";
const build = "build/";
const tmp = ".tmp/";
const exlcudes = "_excludes/";
const nodeModules = "node_modules/";
const deployment = "deployment";

module.exports = {
  gulpLoadPlugins: {
    options: {
      DEBUG: false, // when set to true, the plugin will log info to console
      pattern: ["gulp-*", "gulp.*", "del"], // the glob(s) to search for in package.json
      camelize: true, // if true, transforms hyphenated plugins names to camel case
      lazy: true // whether the plugins should be lazy loaded on demand
    }
  },
  gzip: {
    options: {
      append: true
    }
  },
  scripts: {
    filename: "main.js",
    src: [
      nodeModules + "jquery/dist/jquery.js",
      nodeModules + "wow.js/dist/wow.js",
      nodeModules + "/fitvids/fitvids.js",
      src + assets + "/scripts/main.js"
    ],
    dest: tmp + assets + "scripts"
  },
  uglify: {
    options: {
    }
  }
};
