---
title: Configuring responsive and optimized images with Eleventy
desc: This is part two of a multipart series about how I setup my personal web site using Eleventy. Let's configure responsive images using the eleventy-img plugin.
published: 2020-12-21
tags: [obsolete29, eleventy, webdev]
socialCardUrl: "/posts/configuring-responsive-images-eleventy/og-image/"
---
Previously, we built our base project and got the initial site setup. Today, let's configure responsive images using the eleventy-img plugin.

## Requirements

I want to write about hikes, bicycle trips and vacations on my blog. Those types of posts could have a fair number of images, and I want my site to serve the appropriately sized image for the device viewing the content. There's no need to serve a mobile user the big desktop sized image!

I store my post images in the same folder as the post markdown. I'll use a short code to reference a highish fidelity image in my blog post. When I build the site, eleventy-img will process my original image by creating four versions of the image. It'll create WebP images in small and large resolutions, and it'll create JPEG images in both small and large resolutions. Finally, it'll replace my short code with the responsive markup.

Let's get started!

## Install eleventy-img

You can follow along on the official documentation, [eleventy-img](https://www.11ty.dev/docs/plugins/image/).

```text
npm install @11ty/eleventy-img
```

Here's the configuration for .eleventy.js. I started with [How to optimize images on eleventy (11ty)](https://dev.to/22mahmoud/how-to-optimize-and-lazyload-images-on-eleventy-11ty-206h) as my starting point and have made adjustments for my own use case.

```javascript
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
     eleventyConfig.addAsyncShortcode("myImage", async (src, alt) => {
    if (!alt) {
      throw new Error(`Missing \`alt\` on Image from: ${src}`);
    }

    let stats = await Image(src, {
      widths: [350, 808],
      formats: ["jpeg", "webp"],
      urlPath: "/assets/img/blog/",
      outputDir: localDir + "/assets/img/blog/",
    });

    let lowestSrc = stats["jpeg"][0];
    let highResJpeg = stats["jpeg"][1];
    let lowReswebp = stats["webp"][0];
    let highReswebp = stats["webp"][1];
  

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          ""
        ),
      }),
      {}
    );

    const source = `<source type="image/webp" media="(max-width: 629px)" srcset="${lowReswebp.url}" >
                    <source type="image/webp" media="(min-width: 630px)" srcset="${highReswebp.url}" >
                    <source type="image/jpeg" media="(max-width: 529px)" srcset="${lowestSrc.url}" >
                    <source type="image/jpeg" media="(min-width: 630px)" srcset="${highResJpeg.url}" >`;

    const img = `<img 
                loading="lazy" 
                alt="${alt}" 
                width="${highResJpeg.width}"
                height="${highResJpeg.height}"
                src="${lowestSrc.url}">`;

    return `<picture>${source}${img}</picture>`;
  });	
}
```

## The code

Now I'm able to use the short code in my post markdown like this:

```html
{{ '{% myImage ./src/posts/please-meet-my-cats/lily.jpg, Photo of Lily on the back patio with an oil lamp flame %}' | escape }}
```

When we build our site, eleventy-img replaces the myImage tag with this HTML:

```html
<picture>
    <source type="image/webp" media="(max-width: 629px)" srcset="/assets/img/blog/612b31ea-350.webp" >
    <source type="image/webp" media="(min-width: 630px)" srcset="/assets/img/blog/612b31ea-808.webp" >
    <source type="image/jpeg" media="(max-width: 529px)" srcset="/assets/img/blog/612b31ea-350.jpeg" >
    <source type="image/jpeg" media="(min-width: 630px)" srcset="/assets/img/blog/612b31ea-808.jpeg" >
    <img 
         loading="lazy"
         alt="Photo of Lily on the back patio with an oil lamp flame" 
         width="808"
         height="606"
         src="/assets/img/blog/612b31ea-350.jpeg">
</picture>
```

Neat!

## The images

The original image of  the photo is 1280x960 and weighs in at 381KB. Here are the specs after processing:

Small WebP: 350x263, 9KB  
Large WebP: 808x606, 32KB  
Small JPEG: 350x263, 13KB  
Large JPEG: 808x606, 58KB

Firefox and Chrome will both load the WebP images but even on Safari, the desktop version of the site is serving a 58KB file instead of 381KB one!

## Further reading

I found [Complete Guide to Responsive Images!](https://medium.com/@elad/a-complete-guide-for-responsive-images-b13db359c6c7) helpful as I was figuring out which markup I wanted to use. I also enjoyed reading [Automating Image Optimization Workflow](https://jec.fyi/blog/automating-image-optimization-workflow).

Ok, that's it for now! Thanks for reading.

<aside class="post__callout">

This is part of a multipart series about how I setup my personal web site using [Eleventy](https://11ty.dev).

- Part 1: [Building my personal site with Eleventy](/posts/building-my-personal-site-with-eleventy/)
- Part 2: [Configuring responsive and optimized images with Eleventy](/posts/configuring-responsive-images-eleventy/)
- Part 3: [RSS, a love letter and walkthrough for my Eleventy site](/posts/rss-on-eleventy/)
- Part 4: [Setup social sharing previews, SEO, and favicons on Eleventy](/posts/ogp-seo-favicons-eleventy/)
- Part 5: [Automated social sharing images in 11ty and Puppeteer](/posts/automated-social-sharing-images-eleventy-puppeteer)

</aside>