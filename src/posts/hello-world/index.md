---
title: Hello world!
desc: Welcome to WordPress. This is your first post. Edit or delete it, then
  start blogging!
published: 2012-01-28
tags: hello
socialCardUrl: "/posts/hello-world/og-image/"
changeFreq: "Yearly"
---
page.data.url - {{ page.data.url }}
page.url - {{ page.url }}
post.data.url - {{ post.data.url }}
post.url - {{ post.url }}

Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!

<div>
  {% myImage "./src/posts/hello-world/image01.jpg", "this is the alt text" %}
</div>