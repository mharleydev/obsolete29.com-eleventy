---
title: Using border-top and border-image to create a linear gradient top border
desc: I was struggling to create a linear gradient top border for a call out section. Here's the solution I landed on.
published: 2021-01-12T23:12:28.437Z
date: 2021-01-12T23:12:28.437Z
tags:
  - learning-journal
  - webdev
  - css
socialCardUrl: /posts/linear-gradient-top-border/og-image/
generateOpenGraphImage: false
---
I learned something new today so I wanted to share!

I wanted to create a linear gradient border-top on a call out section on my blog.

<figure>
    {% image "./src/posts/linear-gradient-top-border/images/image-01.jpg", "Screenshot of a border-top linear gradient border." %}
    <figcaption>Here's what I wanted!</figcaption>
</figure>

My searches weren't bringing up the specific example I needed to make it work so I had to dig in deeper.

CSS-Tricks had the closest example in [Gradient Borders in CSS](https://css-tricks.com/gradient-borders-in-css/). The third example is super close as it had two borders but they were on the sides and not the top. Me, fundamentally not understanding how border-image works, couldn't tinker with code pen to make it do what I wanted. I did try reading the MDN docs for [border-image](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image) but it just wasn't clicking for me. Finally, I took to Twitter where my friend Stephan saved me from myself:

https://twitter.com/Vanaf1979/status/1349050068670828547

Eureka! With Stephan's explanation, it finally clicked for me that [border-image-slice](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice) works in a quadrant system, kind of like margin and padding. In addition to Stephan's tweet, the [syntax section on border-image-slice](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice#syntax) is the bit that really helped lock it in for me.

> - When one position is specified, it creates all four slices at the same distance from their respective sides.
> - When two positions are specified, the first value creates slices measured from the top and bottom, the second creates slices measured from the left and right.
> - When three positions are specified, the first value creates a slice measured from the top, the second creates slices measured from the left and right, the third creates a slice measured from the bottom.
> - When four positions are specified, they create slices measured from the top, right, bottom, and left in that order (clockwise).

Here's what I landed on for my specific application.

```css
.div {
  border-top: 3px solid;
  border-image: linear-gradient(to right,#f1f5f7,#d80b77) 30 0 0 0;
}
```

I hope this helps someone else who's searching "create border-top linear gradient". 😆

That's all for now. Thanks for reading!
