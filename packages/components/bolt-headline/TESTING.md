# List component testing steps

## List component render as expected (functionally and visually)

The server-side pre-rendered `bolt-headline` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Headline Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-headline-05-headline/02-components-headline-05-headline.html).
2. Then, enable javascript and watch as the List re-renders on the client-side.
3. The layout should not shift, e.g. the spacing in between each list item should be identical before and after the web component re-renders.

# List component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: list

    In order to present text in a range of sizes, font weights, and fontstyles to convey reading priority
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-headline" component renders and functions as expected

## Scenario: tag variations

1. Given I am viewing the [tag variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-headline-10-headline-tag-variations/02-components-headline-10-headline-tag-variations.html).
2. A List of header tags(H1-H6), a paragragh tag(p), and a span tag.
3. Below each tag should be a text sample that shows the font size each tag would produce.

## Scenario: alignment variations

1. Given I am viewing the [alignment variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-headline-15-headline-align-variations/02-components-headline-15-headline-align-variations.html).
2. There should be three Align headings.
3. Beneath each should be text samples aligned at the far left, the center, and the far right of the page.

## Scenario: style and weight variations

1. Given I am viewing the [style and weight variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-headline-20-headline-style-and-weight-variations/02-components-headline-20-headline-style-and-weight-variations.html).
2. A list of text samples in various combination of font size, font weight, and font styles.

## Scenario: icon variations

1. Given I am viewing the [icon variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-headline-25-headline-icon-variations/02-components-headline-25-headline-icon-variations.html).
2. A list of headlines with three positioning options(before, after, and default), and a headline exhibiting the option to choose various different icons.
3. A headline list that shows examples of the deprecated positioning options.

## Scenario: link variations

1. Given I am viewing the [link variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-headline-30-headline-link-variations/02-components-headline-30-headline-link-variations.html).
2. Three links that show a default icon with an arrow, a defined icon with a magnifying glass, or no icon.

## Scenario: quoted variations

1. Given I am viewing the [quoted variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-headline-35-headline-quoted-variation/02-components-headline-35-headline-quoted-variation.html).
2. There should be a single headline with quotes.
