An image. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

###### Install via NPM

```
npm install @bolt/components-image
```

## Image sizes

**IMPORTANT: This method of adding classes to images is DEPRECATED.**

To specify image size (e.g `u-bolt-width-1/1`) pass the correct class like so:

```
{% set classes = create_attribute(imageAttributes | default({})).addClass([
    "c-bolt-image__img",
    "u-bolt-width-1/1",
  ])
%}
```

Then pass it into the component:

```
{% include '@bolt-components-image/image.twig' with {
  src: "/images/placeholders/tout-4x3-climber.jpg",
  alt: "A Rock Climber",
  imageAttributes: classes,
} only %}
```
