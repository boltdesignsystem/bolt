# Placeholder component testing steps

## Placeholder component render as expected (functionally and visually)

The server-side pre-rendered `bolt-placeholder` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Placeholder Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-placeholder/index.html).
2. Then, enable javascript and watch as the placeholder re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each placeholder and any animations should be identical before and after the web component re-renders.

# Placeholder component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: placeholder

    In order to create a placheholder that represents the absence, or the potential to add, an element in a specific location
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-placeholder" component renders and functions as expected

## Scenario: animated variations

1. Given I am viewing the [animated variation page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-placeholder-placeholder-component--animated/02-components-placeholder-placeholder-component--animated.html).
2. A gray bar should span the horizontal length of the screen view with an animated, dash-line border moving clockwise around the edge.

## Scenario: size variations

1. Given I am viewing the [size variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-placeholder-placeholder-component--sizes/02-components-placeholder-placeholder-component--sizes.html).
2. Extra small size, gray bar with dash-line border that spans the horizontal length of the screen view.
3. Small size, gray bar with dash-line border that spans the horizontal length of the screen view.
4. Medium size, gray bar with dash-line border that spans the horizontal length of the screen view.
5. Large size, gray bar with dash-line border that spans the horizontal length of the screen view.
6. Extra large size, gray bar with dash-line border that spans the horizontal length of the screen view.
7. There should be medium spacing for padding. Reference the spacing sizes on the [Spacing page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-spacing).

## Scenario: stacking variations

1. Given I am viewing the [stacking components page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-placeholder-placeholder-component--stacked/02-components-placeholder-placeholder-component--stacked.html).
2. Two, vertically arranged, gray bars that span the horizontal length of the screen view.
3. Both with animated, dash-line borders moving clockwise around their edge.
4. There should be medium spacing for padding. Reference the spacing sizes on the [Spacing page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-spacing).
