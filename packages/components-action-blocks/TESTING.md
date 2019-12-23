# Action Blocks component testing steps

## Action Blocks component render as expected (functionally and visually)

The server-side pre-rendered `bolt-action-blocks` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Action Blocks Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-action-blocks-05-action-blocks/02-components-action-blocks-05-action-blocks.html).
2. Then, enable javascript and watch as the Action Blocks re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each action-blocks item should be identical before and after the web component re-renders.

# Action Blocks component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: action-blocks

    In order to present items in vertical or horizontal action-blocks
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-action-blocks" component renders and functions as expected

## Scenario: align variations

1. Given I am viewing the [align variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-action-blocks-10-action-blocks-align-variations/02-components-action-blocks-10-action-blocks-align-variations.html).
2. Top align should show content within each item aligned to the top.
3. Center align should show content within each item aligned to the center.
4. Bottom align should show content within each item aligned to the bottom.

## Scenario: border variations

1. Given I am viewing the [border variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-action-blocks-15-action-blocks-border-variations/02-components-action-blocks-15-action-blocks-border-variations.html).
2. If border is set to true, there should be a border in between items.
3. If border is set to false, there should be no border in between items.

## Scenario: theme variations

1. Given I am viewing the [theme variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-action-blocks-20-action-blocks-theme-variations/02-components-action-blocks-20-action-blocks-theme-variations.html).
2. Inside an xlight theme, the Action Blocks should have xlight background.
3. Inside a light theme, the Action Blocks should have light background.
4. Inside a dark theme, the Action Blocks should have dark background.
5. Inside a xdark theme, the Action Blocks should have xdark background.

## Scenario: max items per row variations

1. Given I am viewing the [max items per row variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-action-blocks-25-action-blocks-max-items-per-row/02-components-action-blocks-25-action-blocks-max-items-per-row.html).
2. Make sure the amount of items per row does not exceed the maximum number specified.
