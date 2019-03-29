# Text component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: text

    In order to present text in Bolt's defined typographic styles
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-text" component renders and functions as expected

## Scenario: display variations

1. Given I am viewing the [display variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-text-20-text-display-variations/02-components-text-20-text-display-variations.html).
2. Block display should show a paragraph of text.
3. Inline display should show inline text within a paragraph.

## Scenario: align variations

1. Given I am viewing the [align variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-text-30-text-align-variations/02-components-text-30-text-align-variations.html).
2. Make sure the example texts are defined as block.
3. Start and inherit align should show text aligned to the left (start of the text).
4. Center align should show text aligned to the center.
5. End align should show text aligned to the right (end of the text).

## Scenario: quoted variations

1. Given I am viewing the [quoted variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-text-40-text-quoted/02-components-text-40-text-quoted.html).
2. The text and headline text shown should have double quotes wrapping them.

## Scenario: typographic recipes

[Typographic Recipes](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-text-10-text-typographic-recipes/02-components-text-10-text-typographic-recipes.html)

`// This is a purely visual test, use VRT`
