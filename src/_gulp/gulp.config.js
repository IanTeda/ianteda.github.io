"use strict";

var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var csswring = require("csswring");

const src = "src/";
const assets = "assets/";
const build = "build/";
const tmp = ".tmp/";
const exlcudes = "_excludes/";
const nodeModules = "node_modules/";
const deployment = "deployment";

module.exports = {
  fonts: {
    src: [
      nodeModules + 'font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
      src + assets + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}'
    ],
    dest: tmp + assets + 'fonts'
  },
  gulpLoadPlugins: {
    options: {
      DEBUG: false, // when set to true, the plugin will log info to console
      pattern: ["gulp-*", "gulp.*", "del", "merge2", "shelljs"], // the glob(s) to search for in package.json
      camelize: true, // if true, transforms hyphenated plugins names to camel case
      lazy: true // whether the plugins should be lazy loaded on demand
    }
  },
  gzip: {
    options: {
      append: true
    }
  },
  postcss: {
    processors: [
      autoprefixer({
        browsers: ["last 1 version"]
      }),
      mqpacker,
      csswring
    ]
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
  styles: {
    filename: "main.css",
    css: [
      nodeModules + "/animate.css/animate.css",
      nodeModules + "/font-awesome/css/font-awesome.css",
      src + assets + "styles/screen.css",
      src + assets + "styles/syntax.css"
    ],
    sass: src + assets + "sass/main.scss",
    dest: tmp + assets + "styles"
  },
  uglify: {
    options: {
    }
  }
};
