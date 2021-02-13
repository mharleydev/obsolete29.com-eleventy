---
title: Setup social sharing previews, SEO, and favicons on Eleventy
desc: This is part four of how I used 11ty to setup my personal site. This is how I setup open graph protocol, search and favicons.
published: 2021-01-03T07:16:00-06:00
date: 2021-01-03T07:16:00-06:00
tags: [obsolete29, eleventy, webdev]
socialCardUrl: "/posts/ogp-seo-favicons-eleventy/og-image/og-social-cover.jpg"
---
Today I want to work on a few things so that I'm ready to start sharing posts. I'm going to setup Open Graph protocol, SEO, and favicons on the site.

## Social sharing previews

You know when you share a website on a social media site like Facebook, Twitter, or LinkedIn, and a little preview is generated for the link? That functionality is provided by the [Open Graph protocol](https://ogp.me). Extending the site to participate in Open Graph is pretty straight forward. I just need to add some meta tags to the head of my markup.

I want to support the main Open Graph tags, which is used by most sites, including Facebook. Twitter has it's own set of tags so I want to be sure to support their implementation as well since it's my main social network.

Here's the markup I'm using in my base.njk layout file:

```html
<!-- src/_includes/base.njk -->

<head>
  <!-- Open graph -->
  <meta property="og:title" content="{{ '{{ title }}' }}">
  <meta property="og:description" content="{{ '{{ desc or title }}' }}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="{{ '{{ cover }}' }}"/>
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <!-- Twitter -->
  <meta name="twitter:title" content="{{ '{{ title }}' }}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@obsolete29">
  <meta name="twitter:description" content="{{ '{{ desc or title }}' }}">
  <meta name="twitter:image" content="{{ '{{ cover }}' }}">
  <meta name="twitter:creator" content="@obsolete29">
</head>
```

Here's the front matter from index.njk file. At run time, Eleventy will take these values...

```text
---
title: Michael Harley, chief goblin herder
desc: "I enjoy hiking, biking, foosball, and reading. 
    I work with Power Platform, Powershell, Sharepoint, and I'm learning web development."
layout: base.njk
cover: "https://obsolete29.com/assets/img/social-cover.jpg"
---
```

... and output this markup at build time:

```html
<!-- index.html -->

<head>
  <!-- Open graph -->
  <meta property="og:title" content="Michael Harley, chief goblin herder">
  <meta property="og:description" content="I enjoy hiking, biking, foosball, and reading. 
    I work with Power Platform, Powershell, Sharepoint, and I'\m learning web development.">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://obsolete29.com/assets/img/social-cover.jpg"/>
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <!-- Twitter -->
  <meta name="twitter:title" content="Michael Harley, chief goblin herder">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@obsolete29">
  <meta name="twitter:description" content="I enjoy hiking, biking, foosball, and reading. 
    I work with Power Platform, Powershell, Sharepoint, and I'\m learning web development.">
  <meta name="twitter:image" content="https://obsolete29.com/assets/img/social-cover.jpg">
  <meta name="twitter:creator" content="@obsolete29">
</head>
```

I just have to make sure that all template files include the title, desc, and cover in the front matter of the file.

Validation resources:

- [Twitter card validator](https://cards-dev.twitter.com/validator)
- [LinkedIn post inspector](https://www.linkedin.com/post-inspector/)
- [Facebook sharing debugger](https://developers.facebook.com/tools/debug/)
- [OpenGraph.xyz](https://www.opengraph.xyz/)

## SEO

There are three tags I'm concerning myself with for SEO: the title tag, a description meta tag and a canonical link tag ([rel=canonical: the ultimate guide](https://yoast.com/rel-canonical/)).

```html
<!-- index.html -->

<head>
 <!-- SEO -->
    <title>{{ '{{ title }}' }}</title>
    <meta name="description" content="{{ '{{ desc }}' }}">
    <link rel="canonical" href="{{ '{{ metadata.url }}{{ page.url }}' }}">
</head>
```

Validation resources:

- [Lighthouse](https://web.dev)
- [Free SEO Checker](https://www.seobility.net/en/seocheck/)

### Sitemap.xml

I consider the sitemap as part of search. In my research, sitemaps don't seem that important. Even reading the [Google documentation](https://developers.google.com/search/docs/advanced/sitemaps/overview) about sitemaps says you *may* need a sitemap. I don't feel that my site is very large or complex but if it helps search engines surface my content, then why not? Setting it up on Eleventy is really easy so let's do it.

I followed [Duncan's walkthrough](https://www.belter.io/eleventy-sitemap/) so feel free to go there and read his content. Here is what I did.

I created a new file called sitemap.njk in src directory.

```html
<!-- src/sitemap.njk -->
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {{ '{% for page in collections.all %}' }}
        <url>
            <loc>{{ '{{ site.url }}{{ page.url | url }}' }}</loc>
            <lastmod>{{ '{{ page.date.toISOString() }}' }}</lastmod>
            <changefreq>{{ '{{ page.data.changeFreq or "monthly" }}' }}</changefreq>
        </url>
    {{'{% endfor %}'}}
</urlset>
```

Now when I build the site, Eleventy will generate sitemap.xml.

### Robots.txt

I'm going to setup robots.txt while I'm here so the search bots know about it.

```html
<!-- src/robots.njk -->
---
layout: false
permalink: robots.txt
eleventyExcludeFromCollections: true
---
Sitemap: {{'{{ metadata.url }}'}}/sitemap.xml
User-agent: *
```

The final piece of our search configuration is submitting our site to [Google](https://search.google.com/search-console/about) and [Bing](https://www.bing.com/webmaster/home/mysites).

## Favicons

Favicons are the little images that show up on the browser tab when you're on a particular site (among other places). I didn't do much of a deep dive on the topic myself. I've just done the basics. If you do want to do more of a deep dive, check out [How many favicons should you have in your site?](https://jec.fyi/blog/favicons-manifest). She really goes into a lot more detail. I also found [How to Favicon in 2021](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) an interesting read.

Here are the steps I took.

First, I went to [favicon.io](https://favicon.io/). I was creating an icon from a PNG file so I selected that option and uploaded the image. The site spits out the image with some basic instructions. I placed my favicon images in /assets/img/favicon/.

```html
<!-- src/_includes/base.njk -->

<head>
    <!-- favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="/assets/img/favicon/site.webmanifest">
    <link rel="shortcut icon" href="/assets/img/favicon/favicon.ico">
</head>
```

I updated the site.webmanifest file provided by [favicon.io](http://favicon.io) thusly:

```json
{
    "name":"Michael Harley",
    "short_name":"Michael Harley",
    "icons":
    [
        {
            "src":"/assets/img/favicon/android-chrome-192x192.png",
            "sizes":"192x192",
            "type":"image/png"
        },
        {
            "src":"/assets/img/favicon/android-chrome-512x512.png",
            "sizes":"512x512",
            "type":"image/png"
            }
    ],
    "theme_color":"#ffffff",
    "background_color":"#ffffff",
    "display":"standalone"
}
```

Validation resources:

Say it with me. Validate!

- [Favicon checker](https://realfavicongenerator.net/favicon_checker).

Ok, that's it for today. Thanks for reading my post!

<aside class="post__callout">

This is part of a multipart series about how I setup my personal web site using [Eleventy](https://11ty.dev).

- Part 1: [Building my personal site with Eleventy](/posts/building-my-personal-site-with-eleventy/)
- Part 2: [Configuring responsive and optimized images with Eleventy](/posts/configuring-responsive-images-eleventy/)
- Part 3: [RSS, a love letter and walkthrough for my Eleventy site](/posts/rss-on-eleventy/)
- Part 4: [Setup social sharing previews, SEO, and favicons on Eleventy](/posts/ogp-seo-favicons-eleventy/)
- Part 5: [Automated social sharing images in 11ty and Puppeteer](/posts/automated-social-sharing-images-eleventy-puppeteer)

</aside>