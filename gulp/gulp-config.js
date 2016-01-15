/**
 * GULP CONFIG
 * Configuration file for gulp task runner
 */
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

var src = 'src/';
var assets = 'assets/';
var build = 'build/';
var tmp = '.tmp/';
var exlcudes = '_excludes/';
var bower = 'bower_components/';
var publish = '.publish';

module.exports = {
  fonts: {
    src: [
			src + exlcudes + bower + 'fontawesome/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
      src + assets + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}'
		],
    dest: tmp + assets + 'fonts'
  },
  gzip: {
    options: {
      append: true
    }
  },
  html: {
    optimise: './build/**/*.html',
    dest: build,
    gziped: build + '**/*.gz'
  },
  htmlmin: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      removeRedundantAttributes: false
    }
  },
  images: {
    src: src + assets + 'images/**/*',
    dest: tmp + assets + 'images',
    optimise: tmp + assets + 'images/**/*',
    base: tmp + assets + 'images'
  },
  imagemin: {
    options: {
      progressive: true,
      interlaced: true
    }
  },
  inject: {
    options: {
      read: false
    }
  },
  jekyll: {
    build: [
      build,
      tmp
    ],
    deploy: build + '**/*',
    assets: build + assets,
    tmp: tmp + assets + '**/*'
  },
  postcss: {
    processors: [
				autoprefixer({
        browsers: ['last 1 version']
      }),
				mqpacker,
				csswring
			]
  },
  scripts: {
    filename: 'main.js',
    src: [
				src + exlcudes + bower + 'jquery/dist/jquery.js',
				src + exlcudes + bower + 'bootstrap/dist/js/bootstrap.js',
				src + exlcudes + bower + 'headroom.js/dist/headroom.js',
				src + exlcudes + bower + 'headroom.js/dist/jQuery.headroom.js',
				src + exlcudes + bower + 'holderjs/holder.js',
				src + exlcudes + bower + 'wow/dist/wow.js',
        src + assets + '/scripts/jquery.fitvids.js',
				src + assets + '/scripts/main.js'
			],
    dest: tmp + assets + 'scripts',
    inject: {
      target: src + '_includes/scripts.html',
      dest: src + '_includes/',
      files: tmp + assets + 'scripts/*.js'
    },
    lint: [
      src + assets + '/scripts/main.js',
      src + 'gulp/**/*.js'
    ]
  },
  styles: {
    filename: 'main.css',
    src: [
		//bower + 'bootstrap/dist/css/bootstrap.css',
		src + exlcudes + bower + 'animate.css/animate.css',
		src + exlcudes + bower + 'fontawesome/css/font-awesome.css',
    src + assets + 'styles/screen.css',
    src + assets + 'styles/syntax.css',
    //src + assets + 'styles/ghost.min.css'
  ],
    dest: tmp + assets + 'styles',
    inject: {
      target: src + '_includes/styles.html',
      dest: src + '_includes/',
      files: tmp + assets + 'styles/*.css',
      options: {
        read: false
      }
    }
  },
  uglify: {
    options: {
    }
  }
};
