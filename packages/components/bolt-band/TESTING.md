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

1. Given I am on the [size variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-10-band-size-variations/02-components-band-10-band-size-variations.html)
2. When I view the band with size "none"
3. Then I see there is no space on the top and bottom of the band
4. When I view each of the other bands from "xsmall" to "large"
5. Then I see the respective amount of spacing

## Scenario: theme variations

1. Given I am on the [theme variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-15-band-theme-variations/02-components-band-15-band-theme-variations.html)
2. When I view each band
3. Then I see the appropriate background color, i.e. "xdark" is the darkest and "none" is transparent

## Scenario: tag variations

_Note: this test requires inspecting the source HTML_

1. Given I am on the [tag variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-20-band-tag-variations/02-components-band-20-band-tag-variations.html)
2. When I inspect each example
3. Then the element with the `c-bolt-band` class uses the tag specified in the title

## Scenario: full bleed variations

1. Given I am on the [tag variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-25-band-full-bleed-variations/02-components-band-25-band-full-bleed-variations.html)
2. When I view the "Full bleed" example
3. Then I see the content spans the full width of the page
4. When I view the "Not full bleed" example
5. Then I see the content spans only the available space of its parent container

## Scenario: nested bands usage

1. Given I am on the [nested bands page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-40-band-nested/02-components-band-40-band-nested.html)
2. When I view the band titled "This Band Has 2 Bands Nested Inside"
3. Then I see two bands (light and xlight) nested inside a parent band (xdark)

## Scenario: pinned content usage

1. Given I am on the [pinned content page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-band-30-band-with-pinned-content/02-components-band-30-band-with-pinned-content.html)
2. When I view the first example
3. Then I see:

   - "upper pinned 1" positioned top left
   - "upper pinned 2" positioned top center
   - "upper pinned 3" positioned top right
   - "lower pinned 1" positioned bottom left
   - "lower pinned 2" positioned bottom center
   - "lower pinned 3" positioned bottom right

4. When I view the second example
5. Then I see the breadcrumbs positioned top left and the share tool top right
6. When I view the third example
7. Then I see the share tool positioned top right.
