# Figure component developer testing steps

## Figure renders as expected

The server-side pre-rendered `bolt-figure` component should look almost identical to the client-side rendered version. To verify:

1. Disable JS and view the [Figure Media Variations page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-figure-10-figure-media-variations/02-components-figure-10-figure-media-variations.html).
1. Then, enable JS and watch as the figure components re-render on the client-side.
1. The layout should not shift, e.g. the space between the media and the caption is present before and after the web component re-renders.
1. The `font-family` of the figure caption will change when JS is disabled, but the `font-size` should be the same.
   - Does not apply to [Figure with Web Component](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-figure-15-figure-with-web-component/02-components-figure-15-figure-with-web-component.html). In these examples, we cannot set the `font-size` until the component has rendered.

# Figure component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: Figure

    In order to present media content with a caption
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-figure" component renders and functions as expected

## Scenario: Basic Figure

[Basic Figure](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-figure-05-figure/02-components-figure-05-figure.html)

`// This is a purely visual test, use VRT`

## Scenario: Media Variations

1. Given I am viewing the [Figure with Web Components page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-figure-15-figure-with-web-component/02-components-figure-15-figure-with-web-component.html)
1. And I am looking at the section "Video Figure"
1. Then I should see a video player
1. And I click the video "play" button
1. Then the video should start playing

## Scenario: Figure with Web Components

[Figure with Web Components](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-figure-15-figure-with-web-component/02-components-figure-15-figure-with-web-component.html)

`// This is a purely visual test, use VRT`
