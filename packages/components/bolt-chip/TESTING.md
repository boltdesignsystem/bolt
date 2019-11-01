# Chip component testing steps

## Chip component render as expected (functionally and visually)

The `bolt-chip` component requires JS to function. Perform all tests with JS on.

# Chip component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: chip

    In order to present meta data text
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-chip" component renders and functions as expected

## Scenario: basic

1. Given I am viewing the [basic chip page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-chip-05-chip/02-components-chip-05-chip.html)
2. And I see a piece of text in a pill like container that reads "Chip"
3. When I click on the chip
4. Then nothing should happen because default chips are not links

   Note: The behavior outlined above should be true for all subsequent tests unless otherwise noted. It will be referred to as the "default chip behavior".

## Scenario: url variations

1. Given I am viewing the URL section of the [URL demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-chip-10-chip-url-variations/02-components-chip-10-chip-url-variations.html)
2. And I see two chips, one reads "No URL", the other reads "Has URL"
3. When I click on the "No URL" chip
4. Then nothing should happen
5. When I hover over "Has URL" chip
6. Then the chip's background color will become darker
7. When I click on the "Has URL" chip
8. Then the page will be directed to https://pega.com

## Scenario: target variations

1. Given I am viewing the Target section of the [URL demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-chip-10-chip-url-variations/02-components-chip-10-chip-url-variations.html)
2. And I see two chips, one reads "Open link in current tab", the other reads "Open link in new tab"
3. When I click on the "Open link in current tab" chip
4. Then the page will be directed to https://pega.com
7. When I click on the "Open link in new tab" chip
8. Then a new tab or window will open and be directed to https://pega.com

## Scenario: spacing variations

[Spacing demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-chip-15-chip-spacing-variations/02-components-chip-15-chip-spacing-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: icon variations

[Icon usage demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-chip-20-chip-icon-variations/02-components-chip-20-chip-icon-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: chip with web components

[Web components demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-chip-999-chip-with-web-component/02-components-chip-999-chip-with-web-component.html)

`// This is a purely visual test, use VRT`
