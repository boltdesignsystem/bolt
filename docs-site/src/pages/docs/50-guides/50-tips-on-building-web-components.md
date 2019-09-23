---
title: Tips on Building Web Components
---

## High level tips:
- All WCs built should work with and without Shadow DOM 
- In general, all of Bolt’s Web Components built using lit-HTML have the best browser support + most predictable component rendering / re-rendering
- The vast majority of the known IE 11 rendering quirks are occurring with Preact-built web components that are rendering other nested WCs inside of it (without Shadow DOM)
- Lit-HTML rendered WCs with nested Preact or other Lit WCs should render just fine across the board (even 10+ layers deep)
- Avoid using this.shadowRoot — use this.renderRoot instead
- All of Bolt’s WC share the same lifecycle hooks (default hooks, skateJS hooks, and custom hooks / events we’ve added)
- Props down, events up
- Use Bolt provided polyfill loader to ensure all components load the correct set of Polyfills depending on browser support


## Common WC Patterns / Additional Tips
1. Need to query-select a rendered DOM node inside a different Web Component (this includes nested WCs the current component renders)?
    1. Check to make sure the WC has rendered
    2. If it has, query select via the element.renderRoot.querySelector() syntax
    3. If it hasn’t, listen for the `ready` event and filter by the tag name (details.name)
2. Use `this.renderRoot` to internally reference elements rendered inside the current component
3. This._wasInitiallyRendered is a helpful flag to check to see if a component has rendered at least once
4. In lit-HTML rendered components, you can add real <slot> tags + automatic  “pseudo slots” (when unsupported / unavailable) via the this.slot(‘slotName’) syntax
5. this.addStyles to auto-add <style> tags when rendering to the Shadow DOM
6. this.useShadow to manually opt a component out of rendering to Shadow DOM
7. Styling using :host vs `custom-element` selector
    1. Tip: you need to use two completely separate sets of selectors + styles when writing custom element-specific + :host selector specific styles in order for IE 11 to not toss out the whole style block!
8. Use `withContext` for parent / child components
9. Never write any code in the WC’s constructor that depends on the DOM
10. If you need to query select any DOM that gets rendered by the current component, write your selector in the `rendered` event callback
11. Use `bolt-theme()` to use select CSS var colors in our theming system + auto generated IE 11 fallback CSS
12. Need to auto-disable Shadow DOM recursively? Wrap your component in a form tag!

```
<!-- Button will always render to the Light DOM in this context! -->
<form onsubmit="event.preventDefault()">
  <bolt-button>Button Example</bolt-button>
</form>
```

> Note: if there’s a <button> inside and it's clicked it will submit the form which will reload the page, hence the inline onload JS added above.

