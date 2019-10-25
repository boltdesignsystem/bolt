---
title: Manual testing standards
---

## Main Benefits

- Test repeatability
- Simple instructions that all testers can proceed
- The same language and wording used
- Separate scenarios for tests

## Best practises

- create `TESTING.md` file in root of the component to add manual testing steps
- use Gherkin format for creating steps in scenarios
- always linking to https://boltdesignsuystem.com for reference in functionally and visually tests

## When create manual testing instructions

- when tests need additional manual testing
- when we can't test some functionality using automatic testing

### Example of manual testing instructions

```markdown
# Button component testing steps

## Button component render as expected (functionally and visually)

The server-side pre-rendered Button component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Button Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-05-button/02-components-button-05-button.html).
1. Then, enable javascript and watch as the Button re-renders on the client-side.
1. The spacing, color, and shadow of the button should be identical before and after the web component re-renders.

## Scenario: basic

1. Given I am viewing the [basic button page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-05-button/02-components-button-05-button.html).
1. And I see a button that reads "This is a button".
1. When I hover over the button.
1. Then I should see the button raises up.
1. And the button's shadow gets stronger.

   Note: The behavior outlined above should be true for all subsequent tests unless otherwise noted. It will be referred to as the "default button behavior".

## Scenario: width variations

1. Given I am viewing the [width demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-25-button-width-variations/02-components-button-25-button-width-variations.html).
1. And I see three buttons on the page.
1. Then the "auto width button" should be as wide as the button's text.
1. And the "full width button" should be as wide as the browser's width.
1. When the browser's width is smaller than 600px.
1. Then the "full@small width button" should be as wide as the browser's width.
1. When the browser's width is equal to or larger than 600px.
1. Then the "full@small width button" should be as wide as the button's text.
```
