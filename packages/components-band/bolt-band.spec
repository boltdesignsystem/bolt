# Drupal 8 Schema Spec

band:
  content: <string>
  attributes: <drupal attributes>
  backgroundImage:
    src: <string: uri>
  size: 'medium|large|small'
  fullBleed: <bool>
  theme: 'none|dark|light'



headline:
  attributes: <drupal attributes>
  text:
  icon:
  alignment:
  size:
  weight:


backgroundImage:
  {% include "@bolt/components-background-image.twig" %}


band_content:
  - eyebrow (includes headline w/ options pre-set)
    {% include "@bolt/components-headline.twig" %}
  - headline
    {% include "@bolt/components-headline.twig" %}
  - button
    {% include "@bolt/components-button.twig" %}
  - paragraph
    {% include "@bolt/components-paragraph.twig" %}
  - image
    {% include "@bolt/components-image.twig" %}




paragraph--content-blade.html.twig
  {% include "@bolt/components-band.twig" %}
