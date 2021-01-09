---
title: Automated social sharing images with Eleventy and Puppeteer
desc: I recently figured out how to generate social sharing (Open Graph protocol) preview images using Puppeteer on my Eleventy site. This is what I did!
published: 2021-01-09T13:00:03.106Z
date: 2021-01-09T13:00:03.106Z
tags:
  - obsolete29
  - eleventy
  - webdev
socialCardUrl: /posts/automated-social-sharing-images-eleventy-puppeteer/og-image/
---
First, a disclaimer. I feel kind of cringy about this solution because it feels very hacky to me. I cobbled it together from various sources. I'm learning javascript/node so I do plan to revisit and refactor this solution. I'm posting my cringy, hacky solution in the spirit of learning in public. Here's how I automatically generate social sharing images for my posts!

I started by reading [Automated Social Sharing Images with Puppeteer, 11ty, and Netlify](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln). Then I read [Dynamic Social Sharing Images with Eleventy](https://annualbeta.com/blog/dynamic-social-sharing-images-with-eleventy/), [Generating Open Graph images during Netlify deploy](https://gersom.nl/post/og-images-on-netlify/), [Dynamic Social Sharing Images](https://24ways.org/2018/dynamic-social-sharing-images/), then [Generating Social Sharing Images In Eleventy](https://www.stevenhicks.me/blog/2020/12/generating-social-sharing-images-in-eleventy/).

Søren's [post](https://annualbeta.com/blog/dynamic-social-sharing-images-with-eleventy/) was the closest to being what I want. He generates a little page under each post directory and then uses Puppeteer to snag a screenshot of the page. Clever. The part he doesn't go into detail about is how to iterate over the posts to execute the Puppeteer script for each post, and that's the part I needed the most help figuring out. For now, I've settled on using Stephanie's [solution](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln) of generating a posts.json file with all the posts. From there, I can pickup the list of posts with my Puppeteer script and iterate over the posts to generate the images.

## Subpage for capturing the screenshot

First, let's create a layout to generate the little subpage for each post under `/og-image/`. Later, we'll use Puppeteer to take a screenshot of this page and we'll use that as our social sharing image.

```html
<!-- src/og-image.njk -->
---
pagination:
  data: collections.posts
  size: 1
  alias: article
permalink: /posts/{{'{{ article.fileSlug }}'}}/og-image/
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <title>Dynamic social sharing image for "{{ article.data.title }}"</title>
    <style>
       <!--Your styling here-->
    </style>
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png">
</head>
<body>
    <div class="container">
        <img class="profile-image" src="/img/profile-photo.jpg" alt="">
        <div class="text">
            <h1>{{'{{ article.data.title }}'}}</h1>
            <p>A post on obsolete<span class="highlight">29</span>.com</p>
        </div>
        
    </div>
</body>
</html>

```

Now when I run `npm run build`, I get a page that looks like the screenshot below. It exists under /posts/post-slug/og-image/. Nice.

{% image "./src/posts/automated-social-sharing-images-eleventy-puppeteer/images/screenshot.jpg", "Screenshot of the social sharing preview image", "post__screenshot" %}

This next part is what I struggled the most with. I felt as if I was standing here, holding 4 or 5 threads in my hands, struggling to tie them together. Again, my solution is to generate a posts.json file that I can feed into a javascript function that iterates through all of the posts and creates the screenshot images in the respective og-images directory.

## Build posts.json template

Let's create `posts-json.njk`. This Nunjucks template will generate the posts.json file. I'm adding eleventyExcludeFromCollections because I don't want the output file to show up in the sitemap.

```text
---
permalink: _temp/posts.json
permalinkBypassOutputDir: true
eleventyExcludeFromCollections: true
---
[{{'{% for post in collections.posts %}'}}
    {
        "filepath":"{{'{{ post.inputPath }}'}}",
        "url":"{{'{{ post.url }}'}}",
        "socialCard":"{{'{{ post.url }}'}}og-image/social-cover.jpg"
    }{{'{% if loop.last == false %}'}},{{'{% endif %}'}}
{{'{% endfor %}'}}]
```

The template generates the following json when we build our site.

```json
[
    {
   "url":"/posts/hello-world/"
    },

    {
   "url":"/posts/learning-web-dev/"
    },

    {
   "url":"/posts/lessons-learned-from-bridgestone/"
    },

    {
   "url":"/posts/please-meet-my-cats/"
    }
]
```

Since this file is built every time we run the build script, I don't need this to be under version control. Let's add the _temp directory to .gitignore.

```
# .gitignore
node_modules
_temp
```

## Iterate over posts and save the screenshot

Let's install the modules:

```text
npm install puppeteer
npm install imagemin
npm install imagemin-pngquant
```

You can find the original gist [here](https://gist.github.com/drewm/993d2237e24a928151b953fa3964ce9c). Below is the version that I hacked together.

Save the code below to `_functions\os-images.js`. This script reads `_temp/posts.json`, iterates through each of the little og-images pages, snaps a screenshot, and optimizes the image.

```javascript
// _functions\os-images.js
const fs = require('fs');
const data = fs.readFileSync('_temp/posts.json', 'utf8');
const puppeteer = require('puppeteer');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

// parse JSON string to JSON object
const posts = JSON.parse(data);

// print all databases
posts.forEach(post => {
    console.log(`${post.url}`);
    (async () => {
        let postUrl = 'http://127.0.0.1:5500' + post.url + 'og-image'
        let localDir =  '../DEV600' + post.url + 'og-image/og-image.png'
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(postUrl);
        await page.setViewport({
            width: 600,
            height: 315,
            deviceScaleFactor: 2
        });
        await page.screenshot({path: localDir});
        await browser.close();

        await imagemin([localDir], {
            destination: '../DEV600' + post.url + 'og-image/',
            plugins: [
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
          });
      })();
});
```

I decided to run this as a npm postbuild script so I just added it to package.json:

```json
 "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy",
    "postbuild": "node _functions/og-images.js"
  },
```

Now, when I run npx run build, Eleventy generates my html pages then iterates through posts.json and generates the screenshot for the post.

## Improvements

 - I want to set it up so that it only snaps screenshots for new posts. Right now, the script iterates through every post and snaps a new screenshot every time. That's not great! The path of least resistance using the current solution is to use something like [frontm8er](https://github.com/terabaud/frontm8er) to manage a toggle in the front matter of the posts. The posts.json function above would only put new posts into the posts.json file if the front matter flag was set to do so. The last step of generating a social sharing image would be to set the flag so it doesn't generate it on the next run.
 - I currently use the live server functionality built into vs code to serve the page for puppeteer. I'd like to figure out how to serve the pages to the function without manually making sure I'm searving the pages locally first.

Ok that's it for today. Thanks for reading my post!

<aside class="post__callout">

This is part of a multipart series about how I setup my personal web site using [Eleventy](https://11ty.dev).

- Part 1: [Building my personal site with Eleventy](/posts/building-my-personal-site-with-eleventy/)
- Part 2: [Configuring responsive and optimized images with Eleventy](/posts/configuring-responsive-images-eleventy/)
- Part 3: [RSS, a love letter and walkthrough for my Eleventy site](/posts/rss-on-eleventy/)
- Part 4: [Setup social sharing previews, SEO, and favicons on Eleventy](/posts/ogp-seo-favicons-eleventy/)
- Part 5: [Automated social sharing images in 11ty and Puppeteer](/posts/automated-social-sharing-images-eleventy-puppeteer)

</aside>
