---
title: Pattern Lab 
---

The Pattern Lab install utilizes these core pieces:

- [pattern-lab/patternlab-php-core](https://github.com/pattern-lab/patternlab-php-core)
- [pattern-lab/patternengine-php-twig: Twig-based PatternEngine for Pattern Lab.](https://github.com/pattern-lab/patternengine-php-twig)
- [pattern-lab/drupal-twig-extensions](https://github.com/pattern-lab/drupal-twig-extensions) - These stub in many of Drupal Twig Functions and Filters

## Tricks and Gotchas

### Linking

Since it's all wrapped in an `<iframe>`, links need `target="_blank"` to link out, like this:

```html
<p>Check <a href="https://en.wikipedia.org/wiki/Lorem_ipsum" target="_blank">this out</a>, it's really cool!</p>
``` 
