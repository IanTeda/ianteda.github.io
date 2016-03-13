---
title: Gulp, Jekyll, Github Pages & Cloudflare
description: The technology stack behind ianteda.com
date: 2016-03-15
tags: [Github, Jekyll, Gulp]
layout: post
category: programming
navigation: true
main-header: true
cover: /assets/images/cover-old-typewriter.jpg
logo: /assets/images/logo-light.png
---

> Simple, fast, flexible, secure, https & cheap
> <cite> — Ian Teda </cite>

The technology stack used to develop and serve up ianteda.com includes [Gulp](http://gulpjs.com/) for development, [Jekyll](http://jekyllrb.com/) as the web platform, [Github Pages](https://pages.github.com/) for the hosting, and [Cloudfare](https://www.cloudflare.com/) for CDN and HTTPS.

## Gulp (Development)
Jekyll -- out of the box -- comes with tooling for server reload with file changes and SASS to CSS transpiling during development, which is perfectly fine. But I wanted a more options and flexibility within my development workflow, so I decided to use Gulp. By using Gulp I opened up my development workflow to all the Gulp plugins within the ecosystem. Such as browser-sync, image optimisation, SASS transpiling and merging into PostCSS modules, linting, file minification and g-zipping, checking of deployment files and easy deployment to any number of hosting options.

### Jekyll (Website)
Jekyll is a static website generator written in Ruby. I decided to use Jekyll when it dawned on me that for any content management system (CMS) to be fast it needs a cache system, which is code for static page generation. So why not cut out the need for a database and generate the pages on my local machine.

By removing the database the attach profile is reduced for cyber attacks, it removes the need for a web hosting service I.e. databases. Opening up cheaper hosting options.

One restriction is multiple authors is harder, but can still be done.

### Github Pages (Hosting)
Xxx is the creator of Jekyll and one of the founders of Github. So it isn't surprising that Github supports hosting of Jekyll websites, removing the need to generate locally. Fire free.

Pages also offers CDN and domain redirects, meaning speed and your own domain name. And it is free.

### Cloudfare (HTTPS)
Cloudfare offer DDOS protection, shared SSL and CDN cache for free

### References
* [ianteda.com Source Code](https://github.com/IanTeda/IanTeda.github.io)
* [Github Pages](https://pages.github.com/)
* [Jekyll](http://jekyllrb.com/)
* [CloudFare](https://www.cloudflare.com/)
* [Setting up Jekyll on Windows](http://jekyll-windows.juthilo.com/)
* [Set up subdomain Github](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)
* [Cloudflare HTTPS](https://sheharyar.me/blog/free-ssl-for-github-pages-with-custom-domains/)