# Band component testing steps

## Band component render as expected (functionally and visually)

The server-side pre-rendered `bolt-band` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Band Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-05-band/02-components-band-05-band.html).
2. Then, enable javascript and watch as the band re-renders on the client-side.
3. The layout should not shift, e.g. the spacing and colors should be identical before and after the web component re-renders.

# Band component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: band

    In order to present items in a vertical or horizontal band
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-band" component renders and functions as expected

## Scenario: size variations

1. Given I am viewing the [size variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-10-band-size-variations/02-components-band-10-band-size-variations.html).
2. None size should show no spacing on top and bottom of the band.
3. Xsmall to large size should show the perspective spacing.

## Scenario: theme variations

1. Given I am viewing the [theme variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-15-band-theme-variations/02-components-band-15-band-theme-variations.html).
2. If set to xlight theme, the band should have xlight background.
3. If set to light theme, the band should have light background.
4. If set to dark theme, the band should have dark background.
5. If set to xdark theme, the band should have xdark background.
6. If set to none theme, the band should have no background.

## Scenario: tag variations

1. Given I am viewing the [tag variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-20-band-tag-variations/02-components-band-20-band-tag-variations.html).
2. For each example, the element with the `c-bolt-band` class should have the HTML specified.

## Scenario: full bleed variations

1. Given I am viewing the [tag variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-25-band-full-bleed-variations/02-components-band-25-band-full-bleed-variations.html).
2. Full bleed should span the full width of the page.
3. Not full bleed should take up only the available space of its parent container.

## Scenario: nested bands usage

1. Given I am viewing the [nested bands page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-40-band-nested/02-components-band-40-band-nested.html).
2. Two bands (light and xlight) should be shown nested inside a parent band (xdark).

## Scenario: pinned content usage

1. Given I am viewing the [pinned content page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-30-band-with-pinned-content/02-components-band-30-band-with-pinned-content.html).
2. In the first example, "upper pinned 1" should be positioned top left.
3. "upper pinned 2" should be positioned top center.
4. "upper pinned 3" should be positioned top right.
5. "lower pinned 1" should be positioned bottom left.
6. "lower pinned 2" should be positioned bottom center.
7. "lower pinned 3" should be positioned bottom right.
8. In the second example, the breadcrumbs should be positioned top left, and the share tool top right.
9. In the third example, the share tool should be positioned top right.
