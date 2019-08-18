# Block-list component testing steps

## Block-list component render as expected (functionally and visually)

The server-side pre-rendered `bolt-block-list` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Block-list Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-block-list-05-block-list/02-components-block-list-05-block-list.html).
2. Then, enable javascript and watch as the List re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each item of the block-list should be identical before and after the web component re-renders.

# Block-list component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: block-list

    In order to present list items in a vertical, block display
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-block-list" component renders and functions as expected

## Scenario: theme variations

1. Given I am viewing the [theme variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-block-list-10-block-list-theme-variation/02-components-block-list-10-block-list-theme-variation.html).
2. There is a list of block-list examples each with a different color theme.
3. Theme xlight will have a light theme with a light background and dark font.
4. Theme light will have a light theme with a light background and dark font.
5. Theme medium will have a light theme with a light background and dark font.
6. Theme dark will have a dark theme with a dark background and a light font.
7. Theme xdark will have a dark theme with a dark background and a light font.

