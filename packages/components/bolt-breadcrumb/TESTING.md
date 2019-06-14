# Breadcrumb component testing steps

## Breadcrumb render as expected (visually)
                                 
The server-side pre-rendered `bolt-breadcrumb` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Breadcrumb Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-breadcrumb-05-breadcrumb/02-components-breadcrumb-05-breadcrumb.html).
2. Then, enable javascript and watch the Breadcrumb re-renders on the client-side.
3. The layout and styling should not change. The spacing in between each breadcrumb segment should be identical before and after enabling javascript.

# Breadcrumb component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: breadcrumb

    In order to present a secondary navigation scheme to reveal a user's location on a website
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-breadcrumb" component renders and functions as expected

## Scenario: basic variation

1. Given I am viewing the [basic variation](https://www.boltdesignsystem.com/pattern-lab/patterns/02-components-breadcrumb-05-breadcrumb/02-components-breadcrumb-05-breadcrumb.html).
2. Four segments of text should be visible, with segments seperated by a right facing chevron (">").
3. The first three segments are links and are styled as links (colored text and underlined).

## Scenario: "aria-current" variation

1. Given I am viewing the ["aria-current" variation](https://www.boltdesignsystem.com/pattern-lab/patterns/02-components-breadcrumb-10-breadcrumb-current-page-aria-variation/02-components-breadcrumb-10-breadcrumb-current-page-aria-variation.html).
2. Four segments of text should be visible, with segments seperated by a right facing chevron (">").
3. All four segments are links and are styled as links (colored text and underlined).

## Scenario: keyboard navigation

1. Given I am viewing the [basic variation](https://www.boltdesignsystem.com/pattern-lab/patterns/02-components-breadcrumb-05-breadcrumb/02-components-breadcrumb-05-breadcrumb.html).
2. Each link segment can be focused using the keyboard (by pressing tab).
