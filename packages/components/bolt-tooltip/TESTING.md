# Tooltip component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: tooltip

    In order to present a tooltip containing content
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-tooltip" component renders and functions as expected

## Scenario: direction variations

1. Given I am viewing the [direction variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-tooltip-10-tooltip-direction-variations/02-components-tooltip-10-tooltip-direction-variations.html).
2. Top direction should display the tooltip above the trigger.
3. Bottom direction should display the tooltip below the trigger.

## Scenario: noWrap variations

1. Given I am viewing the [noWrap variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-tooltip-15-tooltip-nowrap-variations/02-components-tooltip-15-tooltip-nowrap-variations.html).
2. The first tooltip's content should display in one line.
3. The second tooltip's content should display in multiple lines.

## Scenario: spacing variations

1. Given I am viewing the [spacing variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-tooltip-20-tooltip-spacing-variations/02-components-tooltip-20-tooltip-spacing-variations.html).
2. None spacing should show the tooltip without any spacing around the content.
3. Xsmall spacing should show the tooltip with xsmall spacing around the content.
4. Small spacing should show the tooltip with small spacing around the content.
5. Medium spacing should show the tooltip with medium spacing around the content.

## Scenario: trigger type variations

1. Given I am viewing the [trigger type variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-tooltip-25-tooltip-trigger-type-variations/02-components-tooltip-25-tooltip-trigger-type-variations.html).
2. The text trigger should display the tooltip on hover.
3. The button trigger should display the tooltip on click.
