---
title: Building my personal site with Eleventy
desc: This is part one of a multipart series about how I setup my personal web site using Eleventy
published: 2020-12-20
tags: [obsolete29, eleventy, webdev]
socialCardUrl: "/posts/building-my-personal-site-with-eleventy/og-image/og-social-cover.jpg"
isFeatured: "Yes"
---
Hello! This is part of a multipart series about how I setup my personal web site using [Eleventy](https://11ty.dev).

<aside class="post__callout">

- Part 1: [Building my personal site with Eleventy](/posts/building-my-personal-site-with-eleventy/)
- Part 2: [Configuring responsive and optimized images with Eleventy](/posts/configuring-responsive-images-eleventy/)
- Part 3: [RSS, a love letter and walkthrough for my Eleventy site](/posts/rss-on-eleventy/)
- Part 4: [Setup social sharing previews, SEO, and favicons on Eleventy](/posts/ogp-seo-favicons-eleventy/)
- Part 5: [Automated social sharing images in 11ty and Puppeteer](/posts/automated-social-sharing-images-eleventy-puppeteer)

</aside>

Before I started to write any code, I took note of what I wanted for my new site.

## Requirements

- **Blogging** \- First and foremost, I want to write posts and publish content, so the site needs to be configured for blogging. I want to be able to write my posts in markdown and not have to do a lot of custom coding just to write a new post.
- **Personal** \- I wanted to host my site on a name space that I own. I've been using obsolete29 as an online monikor for ~18 years now ,so I wanted to use that. I use [Hover](https://www.hover.com/) as my registrar.
- **Static** \- Static sites are all the hotness right now. While there are lots of static site generators, I've landed on [Eleventy](https://11ty.dev). It just seemed like a lot of people in my timeline were talking about it. After reading up a bit on it, I wanted to give it a try. This is my very first static site!
- **Responsive** \- I want the site to work on mobile, desktop, and every size screen in between.
- **Accessible** \- I want to be mindful of accessibility and make sure I'm implementing all the best practices.
- **Discoverable (SEO)** \- I want the site to be discoverable, so I want to be sure I'm implementing SEO best practices.

## Layout / Design

I've spent a lot of time trying to decide on a layout for my site. I've really agonized over it, but I think I've landed on one that I like. Ultimately, I browsed a lot of personal sites of developers I follow on Twitter looking for inspiration. In retrospect, I think I probably did too much borrowing, but I let myself off the hook because I'm new at design, and I'm trying to develop my own sense of design style.

A good resource that I've seen [recommended](https://hybridcattt.com/blog/website-essentials/#inspiration) is [humans.fyi](https://humans.fyi/).

## Initial mockup

Since I'm using this as an exercise to teach myself web development, I used Visual Studio Code to build out the homepage, the post page, and the style sheets as a static mockup. I'll translate this into [Nunjuck layout files](https://www.11ty.dev/docs/languages/nunjucks/) in the next step.

As I created the markup for my site, I tried my best to implement my best understanding of semantic HTML tags. That understanding is based solely on my reading of the MDN specifications and some articles that I've run across in my web prowling. My main take away is to try to avoid using generic div tags if there's a semantic tag available.

I'm studying the guidance from the [Code Guide](https://codeguide.co/) and [CSS Guidelines](https://cssguidelin.es/), so I attempted to implement as much of this information as possible. I also used this as an opportunity to use [BEM](http://getbem.com/introduction/) as a class naming methodology.

I am using [Normalize.css](https://necolas.github.io/normalize.css/) as a starting basis for my styling.

### Resources

- [Code Guide](https://codeguide.co/)
- [CSS Guidelines](https://cssguidelin.es/)
- [Flexbox poster from CSS-Tricks](https://css-tricks.com/posters-for-css-flexbox-and-css-grid/)
- [Using inline SVG](https://css-tricks.com/using-svg/#using-inline-svg)
- [SuperTinyIcons](https://github.com/edent/SuperTinyIcons)
- [Normalize.css](https://necolas.github.io/normalize.css/)

## Eleventy

There are many great guides for getting started with Eleventy, but I got started with the documentation from the [Eleventy website itself](https://www.11ty.dev/docs/getting-started/) and [Create Your First Basic 11ty Website](https://11ty.rocks/posts/create-your-first-basic-11ty-website/) from [11ty.rocks](/Applications/Joplin.app/Contents/Resources/app.asar/11ty.rocks "11ty.rocks"). Another walk thru that I found valuable was [Building Personal Static Site with Eleventy](https://jec.fyi/blog/building-my-static-site-with-11ty) by [Jecelyn](https://twitter.com/jecelynyeen).

### My 11ty configuration

I'm starting out with a basic directory structure.

```text
- src # source files
.eleventy.js # eleventy config file
.gitignore
package.json
```

My src directory is will be laid out thusly:

```text
- src
    - _data # store global data files here
    - _includes # layout templates here
    - about
    - assets
      - css
      - fonts
      - img
    - contact
    - posts
```

I did want to call out one thing with how I'm planning my directory structure. Many people split out the source images from the markdown files for their posts. They just put the markdown for a new post directly into the root of posts like this:

```text
- src
  - posts
    - hello-world.md
```

I want source images to live in the same directory as the markdown files like this:

```text
- src
  - posts
    - hello-world
      - index.md
      - image01.jpg
      - image02.jpg
```

I want my content to be as platform agnostic as possible. Later, should I want to use Gatsby or some other platform, I want to be able to just grab my posts directory. Then, I know that I have both the markdown text and the images that go with a post.

### Build the project

I'm just following the [11ty.rocks](https://11ty.rocks/posts/create-your-first-basic-11ty-website/) guide if you'd like to reference the original. Let's get our new project setup under version control. I'm using GitHub, so let's create a new repository.

1.  Create new repo: obsolete29.com-eleventy
2.  Clone repo locally: <code>git clone https://github.com/mharleydev/obsolete29.com-eleventy.git</code>.
3.  From our new local repo: `npm init -y`
4.  Install eleventy: `npm install @11ty/eleventy`
5.  Let's setup a couple node scripts by updating our package.json file thusly:

```json
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy"
  },
```

6.  Create .eleventy.js in the root of our project.

```javascript
/* .eleventy.js */

module.exports = function (eleventyConfig) {
  
  // copy css and img files to dist
  eleventyConfig.addPassthroughCopy("src/assets");

  // set input and output folder
  return {
    dir: { input: 'src', output: 'dist' },
  };
}
```

7.  Create .gitignore and add `node_modules` to the file.
8.  Create /src/index.md to do our first build.

```md
# Hello World
```

9.  Let's build! Execute `npm run build`. We should get an index.html file in our dist folder! Woohoo! Note: Most guides say to run `npm build` to build your site, but I couldn't get that to work. The Node documentation says to use the run command to run node scripts like I did it. I don't know what that's about!

### Layouts

I'm using [Nunjucks](https://mozilla.github.io/nunjucks/) as my templating language. Nearly all examples and guides I've found on the web uses it. Being able to find many examples of other people using is the biggest benefit for me.

This part will not be a full walk-thru on how I setup my templates. The [Eleventy documentation](https://www.11ty.dev/docs/templates/) on the topic is a great place to start. I'd also recommend taking a look at [11ty.rocks](https://11ty.rocks) for more resources on learning this part. Here is a quick overview of how it works though.

1.  Create `/src/_includes/base.njk`.
2.  I copied the code I built during the mockup phase into base.njk.
3.  I removed the content from index.html and replaced that with {{ '{{ content | safe}}' }}. Below is a presentation of what that looks like.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    {{ '{{ content | safe}}' }}
</body>
</html>
```

1.  Rename <code>index.md</code> that we created in step 8 above to index.njk.
2.  We need to add a [front matter section](https://www.11ty.dev/docs/data-frontmatter/) to index.njk.

```text
---
layout: base.njk
---
```

7.  Now copy the code we removed from step 3 into index.njk, below the front matter section. It should look like this.

```html
---
layout: base.njk
---
<section class="profile">
    <section class="profile__info">
        <h1 class="profile__title">Michael Harley</h1>
        <h2 class="profile__sub-title">chief goblin herder</h2>
        <p class="profile__body">
            Welcome to my personal space on the world wide web.
            I enjoy hiking, biking, foosball, and reading.
            I work with Power Platform, Powershell, Sharepoint, and I'm learning web development.
        </p>
    </section>
</section>
<section class="posts">
    <h1 class="posts__header">Recent Activity</h1>
    {{ '{% for post in collections.posts | reverse %}' }}
    <article class="posts__post-summary">
        <time class="posts__post-summary-date">{{ '{{ post.data.published | dateformat }}' }}</time>
        <a class="posts__post-summary-title" href={{ '{{ post.url }}>{{ post.data.title }}' }}</a>
    </article>
    {{ '{% endfor %}' }}
</section>
```

8.  Now when we run `npm run build`, eleventy looks at your src directory, sees index.njk and tries to process it.

We'll repeat step 7 for each basic page we want, including the about and contact pages. Reference base.njk in the front matter, and put your content below. Eleventy processes each template file you have in your src directory.

Ok, that's it for now! Thanks for reading. Next week, I'll document how I setup my site for responsive and optimized images.

