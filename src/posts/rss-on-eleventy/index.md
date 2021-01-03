---
title: RSS, a love letter and walkthrough for my Eleventy site
desc: I love RSS. I love how uncool it is. Here's how I configured my 11ty site with a RSS feed.
published: 2020-12-31
date: 2020-12-31
tags: [obsolete29, eleventy, webdev]
socialCardUrl: "/posts/rss-on-eleventy/og-image/"
---
I love RSS \(Really Simply Syndication\). It's a pretty old specification in Internet years, first created in 1999. Even the newest release of the specification is 11 years old. At it's core, an RSS feed is a plain text XML file that is updated with new posts, pages, or whatever a web master wants to publish.

I love the open nature of the specification. If my personal site has an RSS feed, then you, as a person interested in what I have to say, can subscribe to my feed using an RSS reader. That's all you have to do. Then, the things I have to say come directly to your RSS feed. No company or algorithm inserting themselves between that interaction to serve ads or to rejigger your timeline.

I love RSS because it's not cool. All the cool kids are talking about React and serverless and serverless react cloud containers and etc. The topic of RSS seems to be an afterthought for many web masters. My personal antidote is about twenty-five percent of the personal sites I visit, do not even publish a feed at all. That makes me sad. Intrepid reader, lets us not make the same mistake. Let's configure RSS on our Eleventy site!

## Install the plugin

I'm going to install [eleventy-plugin-rss](https://www.11ty.dev/docs/plugins/rss/) to get my main feed up and going.

Let's install the package in the obsolete29.com-eleventy directory.

```text
npm install @11ty/eleventy-plugin-rss
```

Now let's configure the software by putting this into our configuration file.

```javascript
// .eleventy.js

const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
};
```

## Configure the layout file

Ok, everything is hooked up; it's time to setup our nunjucks layout file. Below is the one I landed on. 

Note: I changed the demo template from the documentation site. Instead of showing the full content of my posts in my feed, I want to just show the summary. I'd like for readers to come to my site to read my content.

```html
---
permalink: "feed/feed.xml"
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ '{{ metadata.title }}' }}</title>
  <subtitle>{{ '{{ metadata.feed.subtitle }}' }}</subtitle>
  <link href="{{ '{{ metadata.feed.feedUrl }}' }}" rel="self"/>
  <link href="{{ '{{ metadata.url }}' }}/"/>
  <updated>{{ '{{ collections.posts | rssLastUpdatedDate }}' }}</updated>
  <id>{{ '{{ metadata.url }}' }}/</id>
  <author>
    <name>{{ '{{ metadata.author.name }}' }}</name>
    <email>{{ '{{ metadata.author.email }}' }}</email>
  </author>
  {{ '{%- for post in collections.posts %}' }}
  {{ '{% set absolutePostUrl %}{{ post.url | url | absoluteUrl(metadata.url) }}{% endset %}' }}
  <entry>
    <title>{{ '{{ post.data.title }}' }}</title>
    <link href="{{ '{{ absolutePostUrl }}' }}"/>
    <published>{{ '{{ post.data.published | rssDate }}' }}</published>
    <updated>{{ '{{ post.date | rssDate }}' }}</updated>
    <id>{{ '{{ absolutePostUrl }}' }}</id>
    <content type="html">{{ '{{ post.data.desc | htmlToAbsoluteUrls(absolutePostUrl) }}' }}</content>
  </entry>
  {{ '{%- endfor %}' }}
</feed>
```

Now when I build the site, our <code>feed.xml</code> file is generated. Yay!

## Add the link tag to the markup

Finally, I added the feed URL to the head of base.njk. This allows people to put the top level URL into their RSS readers to find our feed. Sweet.

```html
<!-- src/_includes/base.njk -->

<head>
  <!-- RSS feeds -->
  <link rel="alternate" href="{{ metadata.feed.feedUrl}}" type="application/atom+xml" 
    title="{{metadata.title }}">
</head>
```

## Validate

There's a validator service for RSS. I like validators. Would recommend everyone validate! [W3C Feed Validation Service](https://validator.w3.org/feed/).

Ok that's it for now. Thanks for reading this far!

<aside class="post__callout">

This is part of a multipart series about how I setup my personal web site using [Eleventy](https://11ty.dev).

- Part 1: [Building my personal site with Eleventy](/posts/building-my-personal-site-with-eleventy/)
- Part 2: [Configuring responsive and optimized images with Eleventy](/posts/configuring-responsive-images-eleventy/)
- Part 3: [RSS, a love letter and walkthrough for my Eleventy site](/posts/rss-on-eleventy/)
- Part 4: [Setup social sharing previews, SEO, and favicons on Eleventy](/posts/ogp-seo-favicons-eleventy/)

</aside>