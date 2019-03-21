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
