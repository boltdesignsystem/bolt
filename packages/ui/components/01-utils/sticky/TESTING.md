# Sticky component testing steps

## Sticky component render as expected (functionally and visually)

The server-side pre-rendered `bolt-sticky` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Sticky Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-sticky--10-sticky-simple-example/02-components-sticky--10-sticky-simple-example.html).
2. Then, enable javascript and watch as the Sticky elements re-render on the client-side.
3. The layout should not shift, e.g. the items should still stick to the top of the page and should be identical before and after the web component re-renders.

# Sticky component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: Sticky

    In order to present items that will attach to the top of the page when scrolled
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-sticky" component renders and functions as expected

## Scenario: additional content

1. Given I am viewing the [additional content page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-sticky--15-sticky-with-content-example/02-components-sticky--15-sticky-with-content-example.html).
2. There should be a webpage for "Pega for Governement: Healthcare & Social Programs".
3. As the page is scrolled the nav element will attach itself to the top of the viewport.
4. In the nav element a yellow indicator will move to underline each nav element link as it's reached on the page.
5. After reaching the end of "Section 2" a light gray nav element will attach itself to the top of the viewport and replace the previous nav element.
6. In the nav element a blue indicator will move to underline each nav element link as it's reached on the page.
