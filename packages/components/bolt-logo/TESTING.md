# Logo component developer testing steps

## Logo renders as expected (functionally and visually)

View the [Lazyload Variations page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-logo/index.html) and verify the following assertions:

- Logos have the proper aspect ratio. They are not distorted or taking up more space than necessary.
- Inverted logos have the class `c-bolt-logo--inverted` and their colors are inverted, i.e. a light logo on a dark background.

---

# Logo component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: Logo

    In order to display responsive, performant logos on a Pega web property
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-logo" component renders and functions as expected

## Scenario: Basic Logo

[Basic Logo page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-logo-05-logo/02-components-logo-05-logo.html)

`// This is a purely visual test, use VRT`

## Scenario: Invert Variation

[Logo Size Variation page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-logo-10-logo-invert-variation/02-components-logo-10-logo-invert-variation.html)

`// This is a purely visual test, use VRT`
