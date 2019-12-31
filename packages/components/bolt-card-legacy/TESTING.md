# Bolt Card component developer testing steps

## Card renders as expected

1. Server-side rendered custom element `bolt-card`.

1. `c-bolt-card__media`, `c-bolt-card__body` and `c-bolt-card__footer` are rendered in `bolt-card` element.

1. Component is filling all available space i.e. adapting to parent element.

## Responds to prop as expected

Updating `<bolt-link>` props in the browser should trigger the component to re-render, reflecting the new prop value. For example:

1. Change the `tag` prop will change tag with `c-bolt-card` class eg. (div, section, etc.)
1. Change the `contentTag` prop will change main content tag with `c-bolt-card__body` class eg. (div, section, etc.)
1. Change the `theme` prop will add correct class to `bolt-card` element
1. Change the `url` prop will add `url` attribute to `bolt-card`, `data-href` to tag with `c-bolt-card` class and add `a` wrapper around elements inside `c-bolt-card__media` class.

## Patterns are added as expected

Different patterns must be added to specific element in `bolt-card` component

1. Patterns added to `media` section
    * image
    * video
1. Patterns added to `body` section
    * eyebrow
    * headline
    * content
    * text
    * teaser
1. Patterns added to `footer` section
    * buttons
    * link
    * button

---

# Card component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: Card

    In order to show elements in structured and ordered way in element that looks like card
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-card" component renders and functions as expected

## Scenario: Standard card

1. Given I am using a "desktop" browser
1. And I am viewing the [Basic Card page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-card-05-card/02-components-card-05-card.html)
1. Then I should see card component with image on the top, eyebrow, headline and text elemnts in the middle and button on the bottom
1. When I click in the button i will be redirected to "pega.com"

## Scenario: Two buttons

1. Given I am using a "desktop" browser
1. And I am viewing the [Card with Two Buttons page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-card-10-card-with-two-buttons/02-components-card-10-card-with-two-buttons.html)
1. And I am looking at the footer section (section with buttons)
1. Then I should see two buttons next to each other


## Scenario: Card with video

1. Given I am using a "desktop" browser
1. And I am viewing the [Card with Video page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-card-15-card-with-video/02-components-card-15-card-with-video.html)
1. And I am looking at the media section
1. Then I should see video player
1. After click on play button video should start playing
1. Then I looking at bottom section with button
1. After click on "Play or Pause" button with should stop playing
1. After secound click video should start playing again

## Scenario: Card elements variations

[Card Elements Variations page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-card-25-card-band-variation/02-components-card-25-card-band-variation.html)

`// This is a purely visual test, use VRT`
