# Example component developer testing steps

## Example renders as expected

The server-side pre-rendered `bolt-example` component should look almost identical to the client-side rendered version. To verify:

1. Disable JS and view the [Example Media Variations page](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-example-10-example-media-variations/02-components-example-10-example-media-variations.html).
1. Then, enable JS and watch as the example components re-render on the client-side.
1. The layout should not shift, e.g. the space between the media and the caption is present before and after the web component re-renders.
1. The `font-family` of the example caption will change when JS is disabled, but the `font-size` should be the same.
   - Does not apply to [Example with Web Component](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-example-15-example-with-web-component/02-components-example-15-example-with-web-component.html). In these examples, we cannot set the `font-size` until the component has rendered.

# Example component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: Example

    In order to present an example component
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-example" component renders and functions as expected

## Scenario: Basic Example

`// This is a purely visual test, use VRT`
