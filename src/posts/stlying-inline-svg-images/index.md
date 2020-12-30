---
title: "Styling inline SVG images with an external style sheet"
desc: "Let's take a look at how I updated my in-line SVG images so I could style them with an external style sheet"
published: 2020-12-22
tags: [learning-journal, webdev, css, svg]
socialCardUrl: "/posts/stlying-inline-svg-images/og-image/"
---
When I was building [obsolete29.com v1](/posts/building-my-personal-site-with-eleventy/), I chose to [inline my SVG images](https://css-tricks.com/using-svg/#using-inline-svg). I didn't have any experience doing it, but I understood this was a convenient way to adjust the fill and stroke properties to customize the image colors. So, I grab the SVG images I wanted to use from [SuperTinyIcons](https://github.com/edent/SuperTinyIcons), cracked open the SVG files and pasted the code into my markup.

I could see where the stroke and fill properties were being set but as I was messing around with it, I couldn't quite figure out how to style the colors using my external style sheet. At the time, I was just trying to button up this part of my project so I made a mental note and promised to revisit the topic later.

Jermey's post, [SVGs in darkmode](https://adactio.com/journal/17710) gave me an example of how to style my SVG files with an external style sheet! With this information, I cracked open vs code and got to hacking.

Here's a sample of my footer social bar prior to styling. As you can see, I'm just hard coding the color values into the fill properties.

```html
<nav class="site-footer__social-bar">
  <a href="https://twitter.com/obsolete29" rel="me">
    <svg class="site-footer__social-bar-icon" 
      xmlns="http://www.w3.org/2000/svg" aria-label="Twitter" role="img" 
      viewBox="0 0 512 512">
      <rect width="512" height="512" rx="15%" fill="#b4cddd"/>
      <path fill="#233742" d="M437 152a72 72 0 01-40 12a72 72 0 
        0032-40a72 72 0 01-45 17a72 72 0 00-122 65a200 200 0 
        01-145-74a72 72 0 0022 94a72 72 0 01-32-7a72 72 0 0056 69a72 
        72 0 01-32 1a72 72 0 0067 50a200 200 0 01-105 29a200 200 0 
        00309-179a200 200 0 0035-37"/>
    </svg>
  </a>
  <a href="mailto:mike@obsolete29.com" rel="me">
    <svg class="site-footer__social-bar-icon" 
      xmlns="http://www.w3.org/2000/svg" aria-label="ProtonMail" role="img" 
        viewBox="0 0 512 512">
      <rect width="512" height="512" rx="15%" fill="#b4cddd"/>
      <g fill="#233742">
        <path d="M259 77s-108-6-131 114v79s0 12 23 29c28 17 91 68 108 
            68s74-51 102-69c23-16 23-28 23-28v-79C361 71 259 77 259 77zm68 
            159H185v-45c11-57 74-57 74-57s57 0 68 57v45z"/>
        <path d="M259 384l-34-12-97-68v120s0 11 17 11h222c11 0 17-11 
            17-11V304l-97 69-28 11z"/>
      </g>
    </svg>
  </a>
</nav>
```

After reading Jeremy's article, I was able to make some adjustments.

First, my new styles in my external style sheet: I'm using custom properties to set my colors. Here are the relevant sections from my style.css file:

```css
:root {
  --color-footer-fore: #b4cddd;
  --color-footer-background: #233742;
}

.site-footer__svg-background-color {
  fill: var(--color-footer-fore);
}

.site-footer__svg-foreground-color {
  fill: var(--color-footer-background)
}

```

Here's my updated markup. I removed the fill properties and added new classes to the appropriate sections.

```html
<nav class="site-footer__social-bar">
  <a href="https://twitter.com/obsolete29" rel="me">
    <svg class="site-footer__social-bar-icon" 
      xmlns="http://www.w3.org/2000/svg" aria-label="Twitter" 
      role="img" viewBox="0 0 512 512">
      <rect class="site-footer__svg-background-color" width="512" 
        height="512" rx="15%" />
      <path class="site-footer__svg-foreground-color" 
        d="M437 152a72 72 0 01-40 12a72 72 0 
        0032-40a72 72 0 01-45 17a72 72 0 00-122 65a200 200 0 
        01-145-74a72 72 0 0022 94a72 72 0 01-32-7a72 72 0 0056 
        69a72 72 0 01-32 1a72 72 0 0067 50a200 200 0 01-105 
        29a200 200 0 00309-179a200 200 0 0035-37"/>
    </svg>
  </a>
  <a href="mailto:mike@obsolete29.com" rel="me">
    <svg class="site-footer__social-bar-icon" 
      xmlns="http://www.w3.org/2000/svg" aria-label="ProtonMail" 
      role="img" viewBox="0 0 512 512">
      <rect class="site-footer__svg-background-color" width="512" 
        height="512" rx="15%" />
      <g class="site-footer__svg-foreground-color">
        <path d="M259 77s-108-6-131 114v79s0 12 23 29c28 17 91 
          68 108 68s74-51 102-69c23-16 23-28 23-28v-79C361 71 
          259 77 259 77zm68 159H185v-45c11-57 74-57 74-57s57 
          0 68 57v45z"/>
        <path d="M259 384l-34-12-97-68v120s0 11 17 11h222c11 0 
          17-11 17-11V304l-97 69-28 11z"/>
      </g>
    </svg>
  </a>
</nav>
```

There you have it! I probably could have spent a little more time thinking about my class names but I'm pretty happy with this. Thanks to Jeremy for posting the information. I definitely recommend giving him a follow.