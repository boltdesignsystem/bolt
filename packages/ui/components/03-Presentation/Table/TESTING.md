# Table component testing steps

## Table component render as expected (functionally and visually)

The server-side pre-rendered `bolt-table` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [table Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-table-05-table/02-components-table-05-table.html).
2. Then, enable javascript and watch as the table re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each table item should be identical before and after the web component re-renders.

# Table component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: Table

    In order to present items in a table with rows and cells
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-table" component renders and functions as expected

## Scenario: format variations

1. Given I am on the [format variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-table-10-table-format-variations/02-components-table-10-table-format-variations.html)
2. When I view the table titled "Regular format"
3. Then I see all text is aligned to the left
4. When I view the table titled "Numeric format"
5. Then I see the side headers are aligned to the right, while text in other cells are center aligned

## Scenario: borderless table

1. Given I am on the [borderless demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-table-15-table-borderless/02-components-table-15-table-borderless.html)
2. When I view the table titled "Remove the vertical border in between cells"
3. Then I see no vertical dividers in between cells (excluding side headers)

## Scenario: first column fixed width table

1. Given I am on the [first column fixed width demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-table-20-table-first-column-fixed-width/02-components-table-20-table-first-column-fixed-width.html)
2. When I view the table titled "Set column widths to be flexible", where the first column _is not_ set to fixed width
3. Then I see the column widths are evenly distributed
4. When I view the table titled "Set the width of the first column to be as wide as the longest text", where the first column _is_ set to fixed width
5. Then I see the first column is as wide as the longest text in that particular column

## Scenario: table with web components

[table with Web Components](https://boltdesignsystem.com/pattern-lab/patterns/02-components-table-999-table-with-web-component/02-components-table-999-table-with-web-component.html)

`// This is a purely visual test, use VRT`
