## Can I haz images?

This is how you can include a image in a template.

```
{% include 'image.twig' with {
  "src": "/src/images/turtle.jpg",
  "alt": "A Turtle",
  "title": "YEAH! I'm a turtle."
} only %}
```
