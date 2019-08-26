# Button component testing steps

## Button component render as expected (functionally and visually)

The `bolt-button` component requires JS to function. Perform all tests with JS on.

# Button component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: button

    In order to communicate a call-to-action appropriate to the placement context
    As a UX designer, developer or content administrator
    I need to ensure the Button component renders and functions as expected

## Scenario: basic

1. Given I am viewing the [basic button page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-05-button/02-components-button-05-button.html).
2. And I see a button that reads "This is a button".
3. When I hover over the button.
4. Then I should see the button raises up.
5. And the button's shadow gets stronger.

   Note: The behavior outlined above should be true for all subsequent tests unless otherwise noted. It will be referred to as the "default button behavior".

## Scenario: size variations

[Size demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-10-button-size-variations/02-components-button-10-button-size-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: style variations

[Style demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-15-button-style-variations/02-components-button-15-button-style-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: theme variations

[Theme demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-20-button-theme-variations/02-components-button-20-button-theme-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: width variations

1. Given I am viewing the [width demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-25-button-width-variations/02-components-button-25-button-width-variations.html).
2. And I see three buttons on the page.
3. Then the "auto width button" should be as wide as the button's text.
4. And the "full width button" should be as wide as the browser's width.
5. When the browser's width is smaller than 600px.
6. Then the "full@small width button" should be as wide as the browser's width.
7. When the browser's width is equal to or larger than 600px.
8. Then the "full@small width button" should be as wide as the button's text.

## Scenario: border radius variations

[Border radius demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-30-button-border-radius-variations/02-components-button-30-button-border-radius-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: item alignment variations

[Item alignment demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-35-button-align-variations/02-components-button-35-button-align-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: text transform variations

[Text transform demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-40-button-transform-variations/02-components-button-40-button-transform-variations.html)

`// This is a purely visual test, use VRT`

## Scenario: tag variations

1. Given I am viewing the [tag demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-45-button-tag-variations/02-components-button-45-button-tag-variations.html).
2. And I have the browser's developer tool open.
3. When I inspect the button with its tag defined as `a`.
4. Then the element with the `.c-bolt-button` should be an `a` tag.
5. When I inspect the button with its tag defined as `link`.
6. Then the element with the `.c-bolt-button` should be an `a` tag.
7. When I inspect the button with its tag defined as `button`.
8. Then the element with the `.c-bolt-button` should be an `button` tag.
9. When I inspect the button with its tag defined as `submit`.
10. Then the element with the `.c-bolt-button` should be an `button` tag.
11. And the element has `type="submit"` as an attribute.
12. When I inspect the button with its tag defined as `reset`.
13. Then the element with the `.c-bolt-button` should be an `button` tag.
14. And the element has `type="reset"` as an attribute.

## Scenario: text and icon variations

[Text and icon demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-50-button-with-text-and-icon/02-components-button-50-button-with-text-and-icon.html)

`// This is a purely visual test, use VRT`

## Scenario: icon only variations

[Icon only demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-55-button-icon-only/02-components-button-55-button-icon-only.html)

`// This is a purely visual test, use VRT`

## Scenario: 3rd party JS

1. Given I am viewing the [3rd party JS page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-60-button-with-3rd-party-js/02-components-button-60-button-with-3rd-party-js.html).
2. And I see a button that reads "toggle theme with javascript".
3. When I click on this button.
4. Then I should see the page change from xlight theme to xdark theme.
5. When I click on this button again.
6. Then I should see the page change from xdark theme to xlight theme.

## Scenario: web component

[Web component demo](https://boltdesignsystem.com/pattern-lab/patterns/02-components-button-999-button-with-web-component/02-components-button-999-button-with-web-component.html)

`// This is a purely visual test, use VRT`
