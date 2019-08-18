# Pagination component testing steps

## Pagination component render as expected (functionally and visually)

The server-side pre-rendered `bolt-pagination` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Pagination Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-pagination-05-pagination/02-components-pagination-05-pagination.html).
2. Then, enable javascript and watch as the Pagination re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each pagination item should be identical before and after the web component re-renders.

# Pagination component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: pagination

    In order to present items in a vertical or horizontal pagination
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-pagination" component renders and functions as expected

## Scenario: align variations

1. Given I am viewing the [align variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-pagination-20-pagination-align-variations/02-components-pagination-20-pagination-align-variations.html).
2. Start align should show items aligned to the left (start of the pagination).
3. Center align should show items aligned to the center.
4. End align should show items aligned to the right (end of the pagination).
