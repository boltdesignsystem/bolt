# Stack component testing steps

## Stack component render as expected (functionally and visually)

The server-side pre-rendered `bolt-stack` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Stack Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-stack-05-stack/02-components-stack-05-stack.html).
2. Then, enable javascript and watch as the Stack re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each stack item should be identical before and after the web component re-renders.

# Stack component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: stack

    In order to present items in vertical stack
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-stack" component renders and functions as expected

## Scenario: spacing variations

1. Given I am viewing the [spacing variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-stack-10-stack-spacing-variations/02-components-stack-10-stack-spacing-variations.html).
2. Each stack should have unique (bottom) spacing specific to the size stated (xlarge, large, medium, small, xsmall, or none). Reference the spacing sizes on the [Spacing page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-spacing).
