---
title: Using Gulp with Jekyll
date: 2016-01-15
tags: [gulp, jekyll]
lead: This is an excerpt or lead for this article
subclass: 'post tag-speeches'
layout: post
category: programming
navigation: True
cover: 'assets/images/cover-gulp.jpg'
logo: 'assets/images/logo-light.png'
---

### Structure

1. Development
2. Build
3. Deployment

### Development

* Images
  - Copy images from source to temporary folder for serve, but only those changed or new
* Scripts
  - Concatinate
  - Sourcemaps
* Styles
  - Concatinate
  - Sourcemaps
* Inject
  - Styles
  - Scripts


### Production

* Images
  - Clean: Clean temporary folder of images
  - Copy: Copy images from source to temporary folder for serve
  - Watch: Watch image folder for changes and copy changed images to temporary folder
  - Optimise: Optimise images in temporary folder
