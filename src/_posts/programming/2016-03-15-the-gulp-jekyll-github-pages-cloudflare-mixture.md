---
title: The Gulp, Jekyll, Github Pages & Cloudflare Mixture
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

Web technologies for development hosting and security are vast. With proponents singing their own praises. At the start of my [ianteda.com](https://ianteda.com) project [^1] I looked around at the options.

[Wordpress](https://wordpress.org/){:target="_blank"} serves up over 26%[^2] of the internet. Been there done that, so I crossed it off the list <i class="fa fa-times"></i>.

I almost settled on [Ghost](https://ghost.org/){:target="_blank"}. The idea of playing around with [Node.js](https://nodejs.org/en/){:target="_blank"} tickled my fancy. But I balked at the hosting options, which cost money and are few. Hosting with [DigitalOcean](https://www.digitalocean.com/){:target="_blank"} almost swayed me. Self hosting [Ghost](https://ghost.org/){:target="_blank"} was a cheaper option, but both would require what time I have keeping the server up and current instead of creating content. So I cross Ghost off the list <i class="fa fa-times"></i>.

In the end, the technology stack I chose for my [quiver](https://en.wikipedia.org/wiki/Quiver){:target="_blank"} includes [Gulp](http://gulpjs.com/){:target="_blank"} for development, [Jekyll](http://jekyllrb.com/){:target="_blank"} as the web platform, [Github Pages](https://pages.github.com/){:target="_blank"} for the hosting, and [Cloudfare](https://www.cloudflare.com/){:target="_blank"} for CDN and HTTPS. Total cost, $15AUD for domain registration. Tick <i class="fa fa-check"></i>.

## [Gulp](http://gulpjs.com/) (Development)
Jekyll comes with tooling out of the box to help with development, such as server reload on file change and SASS transpiling. But I wanted more flexibility (options) with my development workflow, so I piped in Gulp (did you see what I did there, Gulp joke). Using Gulp opened up my workflow to the Gulp [ecosystem](http://gulpjs.com/plugins/){:target="_blank"} and 2,251 plugins in it.

Below is a list of the plugins in alphabetical order that I use:

* [autoprefixer](https://www.npmjs.com/package/autoprefixer){:target="_blank"}: Write cleaner CSS by adding vender prefixes postCSS
* [Browsersync](https://www.npmjs.com/package/browser-sync){:target="_blank"}: Live reload CSS and keep multiple browsers & devices in sync
* [Concat](https://www.npmjs.com/package/gulp-concat/){:target="_blank"}: Join multiple files into one CSS & JavaScript
* [css-mqpacker](https://www.npmjs.com/package/css-mqpacker){:target="_blank"}: Pack the same CSS media query rules into one media query rule postCSS
* [csswring](https://www.npmjs.com/package/csswring){:target="_blank"}: Delete unneed characters in my CSS file with source maps postCSS
* [eslint](https://www.npmjs.com/package/gulp-eslint/){:target="_blank"}: Lint my JavaScript
* [eslint-config-google](https://www.npmjs.com/package/eslint-config-google){:target="_blank"}: Lint my JavaScript using the Google style guide
* [gh-pages](https://www.npmjs.com/package/gulp-gh-pages/){:target="_blank"}: Publish the website build to Github Pages
* [Gzip](https://www.npmjs.com/package/gulp-gzip/){:target="_blank"}: Compress the deployed files to reduce load time -- i.e. html and JavaScript
* [htmlmin](https://www.npmjs.com/package/gulp-htmlmin/){:target="_blank"}: Delete unneeded characters in my html
* [Imagemin](https://www.npmjs.com/package/gulp-imagemin/){:target="_blank"}: Minify my PNG, JPEG, GIF and SVG images. I have some problems with this one.
* [Inject](https://www.npmjs.com/package/gulp-inject/){:target="_blank"}: Inject dynamic CSS and JavaScript file references into the html header and footer
* [postCSS](https://www.npmjs.com/package/gulp-postcss/){:target="_blank"}: Transform CSS styles with JavaScript plugins
* [SASS](https://www.npmjs.com/package/gulp-sass/){:target="_blank"}: Transpile SASS into CSS

### [Jekyll](http://jekyllrb.com/){:target="_blank"} (Website)
I decided to use Jekyll when it dawned on me that to have a fast content management system (CMS) it needs a cache system. And what is a cache system? A static webpage generator - aka Jekyll. Since I don't need access for multiple authors -- which could still be done with Jekyll and Github, but would require more technical knowledge from the author -- lets skip the whole database thing and go straight to generating the webpages on my local machine and uploading the build.

By removing the database I reduced my cyber attack profile -- no database calls -- and simplifies hosting requirements. Opening up cheaper hosting options.

Jekyll is easy to setup on Mac and Linux machines but is a little bit more work on Windows[^3]

### [Github Pages](http://jekyllrb.com/) (Hosting)
Jekyll was written by [Tom Preston-Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner){:target="_blank"}, the co-founder of Github. So it isn't surprising that Github supports hosting of Jekyll websites -- known as [Github Pages](https://pages.github.com){:target="_blank"}, which removes the need to generate webpages locally. However, Github Pages only allows a few Jekyll Gems (plugins) to run on their server. So I decided to develop locally and upload the build to GitHub Pages. I can do what ever I like now, it is my machine.

GitHub Pages also offers CDN and domain redirects[^4], meaning speed and your own domain name. On top of all that the price is right, free.

### [Cloudfare](https://www.cloudflare.com/){:target="_blank"} (HTTPS/CDN)
Cloudfare makes your website faster and safer by offering DOS protection, shared SSL and CDN cache. They believe so deeply about a secure internet, they have a free tier plan[^5]. Tick, tick and tick. They use a Universal SSL to secure the connection between your users and CloudFlare[^6]. Giving your website a https address.

I used the linked guide for setting up my Jekyll / GitHub website with Clodflare[^7].

##### Footnotes

[^1]: [GitHub Repository for ianteda.com source code](https://github.com/IanTeda/IanTeda.github.io){:target="_blank"}
[^2]: [Usage of content management systems for websites](http://w3techs.com/technologies/overview/content_management/all){:target="_blank"}
[^3]: [Setting up Jekyll on Windows](http://jekyll-windows.juthilo.com/){:target="_blank"}
[^4]: [Set up subdomain Github](https://help.github.com/articles/using-a-custom-domain-with-github-pages/){:target="_blank"}
[^5]: [CloudFlare Plans](https://www.cloudflare.com/plans/){:target="_blank"}
[^6]: [CloudFlare one-click SSL](https://www.cloudflare.com/ssl/){:target="_blank"}
[^7]: [Free SSL for GitHub Pages with Custom Domains](https://sheharyar.me/blog/free-ssl-for-github-pages-with-custom-domains/){:target="_blank"}
