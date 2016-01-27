---
title: Jekyll and Search Engine Optimisation
description: Optimising your Jekyll Website for SEO
date: 2016-01-27
tags: [jekyll, seo]
subclass: 'post tag-speeches'
layout: post
category: programming
navigation: True
cover: 'assets/images/cover-jekyll.jpg'
logo: 'assets/images/logo-light.png'
---

### Basics

* Create unique, accurate page titles <i class="fa fa-check"></i>
* Make use of the "description" meta tag <i class="fa fa-check"></i>
* Improve the structure of your URLs and make your site easier to navigate -- Permalinks <i class="fa fa-check"></i>
* Offer quality content and services -- Build your authority (back links)
* Write better anchor text
* Optimize your use of images -- Image sitemap
* Use heading tags appropriately
* Make effective use of robots.txt
* Be aware of rel="nofollow" for links
* Notify Google of mobile sites <i class="fa fa-check"></i>
* Guide mobile users accurately <i class="fa fa-check"></i>
* Promote your website in the right ways
* Make use of free webmaster tools

Mystery algorithm

* Link to gPlus author <i class="fa fa-check"></i>
* HTTPS <i class="fa fa-check"></i>

### Page Titles
YAML front matter
```
title: Jekyll and Search Engine Optimisation
```

config.yml
```
name: "Ian Teda"
```

the \<title> tag should be placed within the \<head> tag

```
<head>
...
<title>
  {% if page.title %}
    {{ page.title }}
  {% else %}
    {{ site.name }}
  {% endif %}
</title>
...
</head>
```

* The contents of the title tag will usually appear in the first line of the results
* Create a unique title for each page on your site
* Choose a title that effectively communicates the topic of the page's content
* Use brief, but descriptive titles


### Page Description
Make use of the "description" meta tag

YAML front matter
```
description: Optimising your Jekyll Website for SEO
```

```
<head>
...
{% if page.description %}
  <meta name="description" content="{{ page.description }}" />
{% endif %}
...
</head>
```
* Words in the snippet are bolded when they appear in the user's query
* Google might use them as snippets for your pages
* Write a description that would both inform and interest users if they saw your description meta tag as a snippet in a search result
* Having a different description meta tag for each page helps both users and Google

### Permalinks
Improve the structure of your URLs and navigation

* Simple-to-understand URLs will convey content information easily
* lead to better crawling of your documents by search engines
* "friendlier" URLs for those that want to link to your content
* reciting the URL from memory or creating a link
* URLs are displayed in search results
* Use words in URLs
* Create a simple directory structure
* Provide one version of a URL to reach a document
* Plan out your navigation based on your homepage
* Ensure more convenience for users by using ‘breadcrumb lists’
* allows visitors to quickly navigate back to a previous section or the root page (breadcrumbs)
* Allow for the possibility of a part of the URL being removed 404
* Prepare two sitemaps: one for users, one for search engines
* Use mostly text for navigation
* Have a useful 404 page

#### HTTPS

1. Cloudflare / DNS records
2. ssl-redirect / enforce_ssl

###### References
[^n] http://jekyll.tips/tutorials/seo/
http://sixrevisions.com/content-strategy/5-common-seo-mistakes-with-web-page-titles/
http://vdaubry.github.io/2014/10/21/SEO-for-your-Jekyll-blog/
https://moz.com/learn/seo/meta-description
http://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf
https://www.youtube.com/watch?v=vS1Mw1Adrk0
