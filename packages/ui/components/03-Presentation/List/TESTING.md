# List component testing steps

## List component render as expected (functionally and visually)

The server-side pre-rendered `bolt-list` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [List Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-05-list/02-components-list-05-list.html).
2. Then, enable javascript and watch as the List re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each list item should be identical before and after the web component re-renders.

# List component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: list

    In order to present items in a vertical or horizontal list
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-list" component renders and functions as expected

## Scenario: display variations

1. Given I am viewing the [display variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-15-list-display-variations/02-components-list-15-list-display-variations.html).
2. Block display should show a vertical list.
3. Flex display should show a horizontal list with even width items spanning the full width of the list.
4. Inline display should show a horizontal list with auto width items.
5. Inline@breakpoint display should show a vertical list when the browser is smaller than the breakpoint specified, and a horizontal list when the browser is equal to or larger than the breakpoint specified. Breakpoint sizes can be referenced on the [Breakpoint page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-breakpoints).

## Scenario: spacing variations

1. Given I am viewing the [spacing variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-20-list-spacing-variations/02-components-list-20-list-spacing-variations.html).
2. None spacing should show no spacing in between items.
3. Xsmall to xlarge spacing should show the respective spacing in between items. Reference the spacing sizes on the [Spacing page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-spacing).

## Scenario: separator variations

1. Given I am viewing the [separator variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-25-list-separator-variations/02-components-list-25-list-separator-variations.html).
2. Solid separator should show a solid line in between items.
3. Dashed separator should show a dashed line in between items.

## Scenario: inset variations

1. Given I am viewing the [inset variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-30-list-inset-variations/02-components-list-30-list-inset-variations.html).
2. Inset spacing should show the spacing surrounding the item in all 4 directions (top, right, bottom, left).
3. Xsmall to xlarge spacing should show the respective spacing surrounding each item. Reference the spacing sizes on the [Spacing page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-spacing).

## Scenario: align variations

1. Given I am viewing the [align variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-40-list-align-variations/02-components-list-40-list-align-variations.html).
2. Make sure the example lists are defined as inline (horizontal).
3. Start align should show items aligned to the left (start of the list).
4. Center align should show items aligned to the center.
5. End align should show items aligned to the right (end of the list).

## Scenario: valign variations

1. Given I am viewing the [valign variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-45-list-valign-variations/02-components-list-45-list-valign-variations.html).
2. Make sure the example lists are defined as either inline or flex (horizontal).
3. Start valign should show items aligned to the top (start of the list).
4. Center valign should show items aligned to the center.
5. End valign should show items aligned to the bottom (end of the list).

## Scenario: List with Web Components

[List with Web Components](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-list-999-list-with-web-component/02-components-list-999-list-with-web-component.html)

`// This is a purely visual test, use VRT`
