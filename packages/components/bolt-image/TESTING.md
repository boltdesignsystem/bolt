# Image component developer testing steps

## Lazyloading expected behavior

View the [Lazyload Variations page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-20-image-lazyload-variations/02-components-image-20-image-lazyload-variations.html) and verify the following assertions:

- Lazyloaded images have the class `c-bolt-image__lazyload`. The class `is-lazyloaded` is added after the image is loaded.
- Lazyloaded images have a `<noscript>` fallback that contains an image that loads normally.
- Lazyloaded JPG images get special treatment. They transition from a blurred low-resolution placeholder image to a sharp lazyloaded image.
  - Lazyloaded JPG images have the class `c-bolt-image__lazyload--blur`.
- All lazyloaded images are loaded after the window `onload` event, including not-in-view images.
  - This setting is controlled by the `preloadAfterLoad` option in the `lazySizes` plugin. See [the docs](https://github.com/aFarkas/lazysizes#js-api---options).

---

# Image component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: Image

    In order to display responsive, performant images on a Pega web property
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-image" component renders and functions as expected

## Scenario: Basic Image

[Basic Image page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-05-image/02-components-image-05-image.html)

`// This is a purely visual test, use VRT`

## Scenario: Size Variation

[Image Size Variation page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-10-image-size-variations/02-components-image-10-image-size-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: Source Variation

[Image Source Variation page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-15-image-source-variations/02-components-image-15-image-source-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: Lazyload Variations

[Image Lazyload Variation page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-20-image-lazyload-variations/02-components-image-20-image-lazyload-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: Image Custom Width and Height Variations

[Image Custom Width and Height Variations page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-25-image-custom-width-height-variations/02-components-image-25-image-custom-width-height-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: Image Zoom (desktop)

1. Given I am using a "desktop" browser
1. And I am viewing the [Image Zoom page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-30-image-zoom-variation/02-components-image-30-image-zoom-variation.html)
1. Then I should see an image of a tablet
1. And I should see a "magnifying glass" icon over the tablet
1. When I mouse over the tablet image
1. Then the mouse becomes a magnifying glass
1. And I can see a zoomed-in part of the tablet image
1. When I move the mouse around the tablet image
1. Then other zoomed-in parts of the tablet image are shown
1. When I move the mouse outside of the tablet image
1. Then the mouse returns to the default icon
1. And the tablet image returns to its original state

## Scenario: Image Zoom (mobile)

1. Given I am using a "mobile" browser
1. And I am viewing the [Image Zoom page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-image-30-image-zoom-variation/02-components-image-30-image-zoom-variation.html)
1. Then I should see an image of a tablet
1. And I should see a "magnifying glass" icon over the tablet
1. When I tap on the tablet image
1. Then a magnifying glass appears where I've tapped
1. And I can see a zoomed-in part of the tablet image
1. When I drag my finger around the tablet image
1. Then other zoomed-in parts of the tablet image are shown
1. When I remove my finger or drag it outside of the tablet image
1. Then the tablet image returns to its original state
