# Code Snippet component testing steps

## Code Snippet component render as expected (functionally and visually)

The server-side pre-rendered `bolt-code-snippet` component should look almost identical to the client-side rendered version. To verify:

1. Disable javascript and view the [Code Snippet Demo page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-code-snippet-15-code-snippet-language-variation/02-components-code-snippet-15-code-snippet-language-variation.html).
2. Then, enable javascript and watch as the Code Snippet re-renders on the client-side.
3. The layout should not shift, e.g. the format of each code snippet should be identical before and after the web component re-renders.

# Code Snippet component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. In each scenario, browser-type is specified when necessary. If browser type is not specified, the test applies to both "desktop" and "mobile" browsers.

## Feature: code snippet

    In order to present a fragment of computer code with syntax highlighting
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-code-snippet" component renders and functions as expected

## Scenario: display variations

1. Given I am viewing the [display variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-code-snippet-10-code-snippet-display-variation/02-components-code-snippet-10-code-snippet-display-variation.html).
2. Block display should present a block of code taking up full width of the page and the content spans multiple lines.
3. Inline display should present an inline piece of code with its width adjusted to the natural content width.

## Scenario: language variations

1. Given I am viewing the [language variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-code-snippet-15-code-snippet-language-variation/02-components-code-snippet-15-code-snippet-language-variation.html).
2. CSS display should show three lines of code in css syntax highlighting.
3. SCSS display should show three lines of code in an scss syntax highlighting.
4. HTML display should show three lines of code in an html syntax highlighting.
5. Javescript display should one line code in a Javascript syntax highlighting.
6. Twig display should show five lines of code in a twig template syntax highlighting.

## Scenario: syntax variations

1. Given I am viewing the [syntax variations page](https://boltdesignsystem.com/pattern-lab/patterns/02-components-code-snippet-20-code-snippet-syntax-variation/02-components-code-snippet-20-code-snippet-syntax-variation.html).
2. Light display should show a block of code with syntax highlighting on a light gray background.
3. Dark display should show a block of code with syntax highlighting on a black background.
4. The display of none should show no syntax highlighting on a gray background.
