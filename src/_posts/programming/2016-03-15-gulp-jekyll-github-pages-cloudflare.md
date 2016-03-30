---
title: Gulp, Jekyll, Github Pages & Cloudflare
description: Simple, fast, flexible, secure & https. Total cost, $15AUD for domain registration.
date: 2016-03-15
tags: [Gulp, Jekyll, Github, Github Pages, Cloudflare]
layout: post
category: programming
navigation: true
main-header: true
cover: /assets/images/cover-old-typewriter.jpg
logo: /assets/images/logo-light.png
---

> Flexible, simple, fast, secure & https. Total cost, $15AUD for domain registration.<br/>
> <cite> — Ian Teda </cite>

Web technologies for development hosting and security are numerous. With each propent singing there own praises. At the start of my [ianteda.com](https://ianteda.com) project [^1] I looked around at the options.

[Wordpress](https://wordpress.org/) serves up over 26%[^2] of the internet, but I was bored with it. So I crossed that one off the list <i class="fa fa-times"></i>.

I almost settled on [Ghost](https://ghost.org/). The idea of playing around with [Node.js](https://nodejs.org/en/) tickled my fancy. But I balked at the hosting options, which cost money and are few. Hosting with [DigitalOcean](https://www.digitalocean.com/) almost swayed me and self hosting [Ghost](https://ghost.org/) was a cheaper option, but both would require what time I do have keeping the server up and current instead of creating content. So I cross that one off the list <i class="fa fa-times"></i>.

In the end, the technology stack I chose for my [quiver](https://en.wikipedia.org/wiki/Quiver) was made up of [Gulp](http://gulpjs.com/) for development, [Jekyll](http://jekyllrb.com/) as the web platform, [Github Pages](https://pages.github.com/) for the hosting, and [Cloudfare](https://www.cloudflare.com/) for CDN and HTTPS. Total cost, $15AUD for domain registration. Tick <i class="fa fa-check"></i>.

## [Gulp](http://gulpjs.com/) (Development)
Jekyll comes with tooling out of the box to help with development, such as server reload on file change and SASS transpiling. But I wanted more flexibility (options) with my development workflow, so I piped in Gulp (did you see what I did there, Gulp joke). Using Gulp opened up my workflow to the Gulp [ecosystem](http://gulpjs.com/plugins/) and the 2,251 plugins in it.

Below is a list of the plugins that I used during development and for deployment of the site in alphabetical order:

* [autoprefixer](https://www.npmjs.com/package/autoprefixer): Write cleaner CSS by adding vender prefixes postCSS
* [Browsersync](https://www.npmjs.com/package/browser-sync): Live reload CSS and keep multiple browsers & devices in sync
* [Concat](https://www.npmjs.com/package/gulp-concat/): Join multiple files into one CSS & JavaScript
* [css-mqpacker](https://www.npmjs.com/package/css-mqpacker): Pack the same CSS media query rules into one media query rule postCSS
* [csswring](https://www.npmjs.com/package/csswring): Delete unneed characters in my CSS file with source maps postCSS
* [eslint](https://www.npmjs.com/package/gulp-eslint/): Lint my JavaScript
* [eslint-config-google](https://www.npmjs.com/package/eslint-config-google): Lint my JavaScript using the Google style guide
* [gh-pages](https://www.npmjs.com/package/gulp-gh-pages/): Publish the website build to Github Pages
* [Gzip](https://www.npmjs.com/package/gulp-gzip/): Compress the deployed files to reduce load time -- i.e. html and JavaScript
* [htmlmin](https://www.npmjs.com/package/gulp-htmlmin/): Delete unneeded characters in my html
* [Imagemin](https://www.npmjs.com/package/gulp-imagemin/): Minify my PNG, JPEG, GIF and SVG images. I have some problems with this one.
* [Inject](https://www.npmjs.com/package/gulp-inject/): Inject dynamic CSS and JavaScript file references into the html header and footer
* [postCSS](https://www.npmjs.com/package/gulp-postcss/): Transform CSS styles with JavaScript plugins
* [SASS](https://www.npmjs.com/package/gulp-sass/): Transpile SASS into CSS

### [Jekyll](http://jekyllrb.com/) (Website)
I decided to use Jekyll when it dawned on me that for any content management system (CMS) to be fast it needs a cache system. What is a cache system? but a static webpage generator. Since I did not need the functionality of allowing access to multiple authors -- which could still be done with Jekyll and Github, but would require more technical knowledge from the author -- lets skip the whole database thing and go straight to generating the webpages on my local machine and uploading the build.

By removing the database I reduced my cyber attach profile -- no database calls -- and simplifies hosting requirements. Opening up cheaper hosting options.

Jekyll is easy to setup on Mac and Linux machines but is a little bit more work on Windows[^3]

### [Github Pages](http://jekyllrb.com/) (Hosting)
Jekyll was written by [Tom Preston-Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner), the co-founder of Github. So it isn't surprising that Github supports hosting of Jekyll websites -- known as [Github Pages](https://pages.github.com), which removes the need to generate webpages locally. However, Github Pages only allows a few Jekyll Gems (plugins) to run on their server. So I decided to develop locally and upload the build to GitHub Pages. I can do what ever I like now, it is my machine.

GitHub Pages also offers CDN and domain redirects[^4], meaning speed and your own domain name. On top of all that the price is right, free.

### [Cloudfare](https://www.cloudflare.com/) (HTTPS)
Cloudfare makes your website faster and safer by offering DOS protection, shared SSL and CDN cache. They believe so deeply about a secure internet, they have a free tier plan[^5]. Tick, tick and tick. They use a Universal SSL to secure the connection between your users and CloudFlare[^6]. Giving your website a https address.

I used the linked guide for setting up my Jekyll / GitHub website with Clodflare[^7].

##### Footnotes

[^1]: [GitHub Repository for ianteda.com source code](ttps://github.com/IanTeda/IanTeda.github.io)
[^2]: [Usage of content management systems for websites](http://w3techs.com/technologies/overview/content_management/all)
[^3]: [Setting up Jekyll on Windows](http://jekyll-windows.juthilo.com/)
[^4]: [Set up subdomain Github](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)
[^5]: [CloudFlare Plans](https://www.cloudflare.com/plans/)
[^6]: [CloudFlare one-click SSL](https://www.cloudflare.com/ssl/)
[^7]: [Free SSL for GitHub Pages with Custom Domains](https://sheharyar.me/blog/free-ssl-for-github-pages-with-custom-domains/)
