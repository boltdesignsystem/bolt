# Share component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: share

    In order to present social icon links in a share tool
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-share" component renders and functions as expected

## Scenario: size variations

1. Given I am viewing the [size variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-share-10-share-size-variations/02-components-share-10-share-size-variations.html).
2. The share tool should be presented in 2 sizes: small and medium.

## Scenario: opacity variations

1. Given I am viewing the [opacity variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-share-15-share-opacity-variations/02-components-share-15-share-opacity-variations.html).
2. The share tool should be presented in 5 opacity values: 20, 40, 60, 80, and 100.

## Scenario: align variations

1. Given I am viewing the [align variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-share-20-share-align-variations/02-components-share-20-share-align-variations.html).
2. Start align should show share items aligned to the left (start of the share).
3. Center align should show share items aligned to the center.
4. End align should show share items aligned to the right (end of the share).
