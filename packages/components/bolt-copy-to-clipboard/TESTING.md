# Copy-to-clipboard component testing steps

## Copy-to-clipboard component render as expected (functionally and visually)

The server-side pre-rendered `bolt-copy-to-clipboard` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Copy-to-clipboard Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-copy-to-clipboard-05-copy-to-clipboard/02-components-copy-to-clipboard-05-copy-to-clipboard.html).
2. Then, enable javascript and watch as the Copy-to-clipboard re-renders on the client-side.
3. The layout should not shift, e.g. the icon and text should be identical before and after the web component re-renders.

# Copy-to-clipboard component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: copy-to-clipboard

    In order to allow the user to copy the current page URL to clipboard to paste and share
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-copy-to-clipboard" component renders and functions as expected

## Scenario: multiple instances

1. Given I am viewing the [multiple instances page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-copy-to-clipboard-10-copy-to-clipboard-multiple-instances/02-components-copy-to-clipboard-10-copy-to-clipboard-multiple-instances.html).
2. There is a vertical list of two copy link items.
3. The first is a line of text proceeded by a chain icon.
4. When the text is clicked a spinner circle. loading animation will start followed by the confirmation message 'copied!'.
5. The second is a line of text proceeded by a chain icon.
6. When the text is clicked a spinner circle. loading animation will start followed by the confirmation message 'copied!'.
7. If one item is clicked on after the other the url copied in clipboard will be replaced by most recent copy link url.

## Scenario: spacing variations

1. Given I am viewing the [custom content variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-copy-to-clipboard-15-copy-to-clipboard-custom-content/02-components-copy-to-clipboard-15-copy-to-clipboard-custom-content.html).
2. There is a vertical list of four copy link items.
3. The first is copy link displaying a custom icon of a triangle with exclemation point followed by text.
4. The second is a copy link that when clicked displays a transition animation with the text 'custom transition' instead of spinner circle.
5. The third is a copy link that when clicked starts a default transition animation followed by custom confirmation text.
6. The fourth is a copy link that displays a triangle with exclemation point icon and when clicked displays custom transition animation and custom confirmation message.

