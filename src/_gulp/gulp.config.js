"use strict";

const src = 'src/';
const assets = 'assets/';
const build = 'build/';
const tmp = '.tmp/';
const exlcudes = '_excludes/';
const bower = 'bower_components/';
const deployment = 'deployment';

module.exports = {
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