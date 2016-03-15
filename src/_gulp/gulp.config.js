"use strict";

const src = 'src/';
const assets = 'assets/';
const build = 'build/';
const tmp = '.tmp/';
const exlcudes = '_excludes/';
const bower = 'bower_components/';
const deployment = 'deployment';

module.exports = {
  gulpLoadPlugins: {
    options: {
      DEBUG: false, // when set to true, the plugin will log info to console
      pattern: ["gulp-*", "gulp.*", "del"], // the glob(s) to search for 
      config: 'package.json', // where to find the plugins, by default searched up from process.cwd() 
      scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within 
      replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context 
      camelize: true, // if true, transforms hyphenated plugins names to camel case 
      lazy: true, // whether the plugins should be lazy loaded on demand 
      rename: {} // a mapping of plugins to rename. i.e. 'gulp-ruby-sass': 'sass'
    }
  },
  gzip: {
    options: {
      append: true
    }
  },
  scripts: {
    filename: 'main.js',
    src: [
				src + exlcudes + bower + 'jquery/dist/jquery.js',
				src + exlcudes + bower + 'bootstrap/dist/js/bootstrap.js',
				src + exlcudes + bower + 'wow/dist/wow.js',
        src + assets + '/scripts/jquery.fitvids.js',
				src + assets + '/scripts/main.js'
			],
    dest: tmp + assets + 'scripts'
  },
  uglify: {
    options: {
    }
  }
  
};