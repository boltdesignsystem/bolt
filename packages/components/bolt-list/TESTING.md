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
2. When I am viewing the "Block" section.
3. Then I should see a vertical list of items.
4. When I am viewing the "Flex" section.
5. Then I should see a horizontal list of items evenly distributed across the width of the browser.
6. When I am viewing the "Inline" section.
7. Then I should see a horizontal list of items with auto width.
8. When I am viewing each of the "Inline@[breakpoint name]" sections.
9. Then I should see a vertical list when the browser is smaller than the breakpoint specified, and a horizontal list when the browser is equal to or larger than the breakpoint specified.

Note: Reference the breakpoint sizes on the [Breakpoints page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-breakpoints)

## Scenario: spacing variations

1. Given I am viewing the [spacing variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-20-list-spacing-variations/02-components-list-20-list-spacing-variations.html).
2. When I am viewing each of the "Block list with spacing" sections.
3. Then I should see a vertical list of items spaced out to the specific size.
4. When I am viewing each of the "Flex list with spacing" sections.
5. Then I should see a horizontal list of items evenly distributed across the width of the browser, and spaced out to the specific size.
6. When I am viewing each of the "Inline list with spacing" sections.
7. Then I should see a horizontal list of items with auto width spaced out to the specific size.

Note: Reference the spacing sizes on the [Spacing page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-spacing).

## Scenario: separator variations

[Separator variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-25-list-separator-variations/02-components-list-25-list-separator-variations.html).

`// This is a purely visual test, use VRT`

## Scenario: inset variations

1. Given I am viewing the [inset variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-30-list-inset-variations/02-components-list-30-list-inset-variations.html).
2. When I am viewing each of the "Regular spacing" sections.
3. Then I should see spacing only in between items.
4. When I am viewing each of the "Inset spacing" sections.
5. Then I should see spacing surrounding each item in all 4 directions (top, right, bottom, left).

Note: Reference the spacing sizes on the [Spacing page](https://boltdesignsystem.com/pattern-lab/?p=viewall-visual-styles-spacing).

## Scenario: align variations

[Align variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-40-list-align-variations/02-components-list-40-list-align-variations.html).

`// This is a purely visual test, use VRT`

## Scenario: valign variations

[Valign variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-list-45-list-valign-variations/02-components-list-45-list-valign-variations.html).

`// This is a purely visual test, use VRT`

## Scenario: List with Web Components

[List with Web Components](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-list-999-list-with-web-component/02-components-list-999-list-with-web-component.html)

`// This is a purely visual test, use VRT`
