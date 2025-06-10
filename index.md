---
subject: World
---
# Hello {{ subject }}

You can type here!

- [Markdown](/docs/languages/markdown/)
- [Liquid](/docs/languages/liquid/)

{% include "svgimg.liquid" %}

## Posts

{%- for post in collections.posts %}
- [{{ post.data.title }}]({{ post.url}})
  {%- endfor %}

_Built with {{ eleventy.generator }}_ 