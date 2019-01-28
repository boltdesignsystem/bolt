# Link component developer testing steps

## Button renders as expected

1. Server-side (Twig) pre-rendered links perform a one-time upgrade to become fully client-side (JS) rendered web components. When the web component initializes, the underlying HTML of the `<bolt-link>` element is replaced, including the `<replace-with-children>` helper element, while the content inside the HTML is retained.

1. Purely client-side rendered links perform the same initialization step described above, but can skip the step of stripping out any helper HTML. These web components just move their inner content into the appropriate slots and render.

1. When a link web component initializes, it will be rendered either to the Shadow DOM or to the Light DOM. The default is to render to the Shadow DOM, but it will render to the Light DOM in the following cases:

   - You are using an older browser (IE11)
   - The component is nested inside a `<form>` tag

     ```html
     <form>
       <bolt-button
         >Light DOM inside a <code>&lt;form&gt;</code> tag</bolt-button
       >
     </form>
     ```

   - The component has the `no-shadow` attribute

     ```html
     <bolt-button no-shadow
       >Light DOM via the <code>no-shadow</code> attribute</bolt-button
     >
     ```

1. When a `<bolt-link>` is moved around the page by external JS, it should render as expected, i.e. it does not disappear.

## Responds to prop changes as expected

Updating `<bolt-link>` props in the browser should trigger the component to re-render, reflecting the new prop value. For example:

1. Change the `url` prop and the internal `<a>` element should update to match. Same is true for `target`.

1. Change the `display` prop from `flex` to `inline` and the internal `<a>` element class should update from `c-bolt-link--display-flex` to `c-bolt-link--display-inline`.

## Slotted content renders as expected

Slotted content nested inside `<bolt-button>` should be placed inside the correct inner container when the component initializes. For example:

1. Link text should be placed in the default slot and wrapped in a `<span>` element with the class `c-bolt-link__text`.
1. An icon in the `after` or `before` slot should be wrapped in a `<span>` element with the class `c-bolt-link__icon`.

## Initial anchor tag handled as expected

When a semantic `<a>` tag is placed directly inside the `<bolt-link>` element, the component will repurpose attributes from that `<a>` tag when setting up its own internally-rendered `<a>` element. Example:

```html
<bolt-link>
  <a href="https://pega.com" data-foo="bar">Hello world!</a>
</bolt-link>
```

Note: currently this also means that a nested link without an `href` attribute wouldn't automatically inherit the `url` prop from the parent.

```html
<!-- This won't work -->
<bolt-link url="https://pega.com">
  <a data-foo="bar">Hello world!</a>
</bolt-link>
```

---

# Link component functional testing steps

Functional testing should be performed manually by the QA team across the standard compliment of browsers. Browser-type is specified when necessary. If browser type is not specified, the test applies to both browser types.

## Feature: Link

    In order to navigate to another location from a Pega web property
    As a UX designer, developer or content administrator
    I need to ensure the "bolt-link" component renders and functions as expected

## Scenario: Link hover state

1. Given I am using a "desktop" browser
1. And I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html)"
1. And I am looking at the section "Link" (below the "Schema" section)
1. Then I should see a link with the text "This is a text link"
1. When I mouse over the link
1. Then the link text-color should lighten

## Scenario: Inline link wrapping

1. Given I am using a "desktop" browser
1. And I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html)"
1. And I am looking at the section "Link Display Variations"
1. And I am looking at the sub-section "Inline link"
1. Then I should see a paragraph that contains two links
1. When I resize the browser to less than 600px wide
1. Then the link text should wrap to the next line

## Scenario: Flex link icon position

1. Given I am using a "desktop" browser
1. And I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html)"
1. And I am looking at the section "Link Display Variations"
1. And I am looking at the sub-section "Flex link"
1. Then I should see two links
1. And each link has an icon to the left or right
1. When I resize the browser to less than 900px wide
1. Then the link text should wrap to the next line
1. And the icon should remain "fixed" beside the link

## Scenario: Link icon variations

`// This is a purely visual test, use VRT`

## Scenario: Link vertical-alignment variations (start)

1. Given I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html)"
1. And I am looking at the section "Link Valign Variations"
1. And I am looking at the sub-section "Valign: start"
1. Then I should see a link with an icon "fixed" to the left
1. And the icon should be vertically-aligned with the top of the link text

## Scenario: Link vertical-alignment variations (center)

1. Given I am viewing the URL "[https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html](https://master.boltdesignsystem.com/pattern-lab/patterns/02-components-link/index.html)"
1. And I am looking at the section "Link Valign Variations"
1. And I am looking at the sub-section "Valign: start"
1. Then I should see a link with an icon "fixed" to the left
1. And the icon should be vertically-aligned with the center of the link text
