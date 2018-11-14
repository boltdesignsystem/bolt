# Button component testing steps

## Button renders as expected (functionally and visually)
  1. Visually, Twig pre-rendered buttons perform a one-time upgrade to being fully client-side rendered as expected (including the `<replace-with-children>` helper element automatically getting removed while retaining nested children / content)
    - [ ] In JavaScript-only buttons being rendered to the Shadow DOM
    - [ ] In JavaScript-only buttons being rendered to the Light DOM
    - [ ] Twig-pre-rendered buttons being rendered to the Shadow DOM
    - [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a  `<form>`)

  2. Like all Bolt components, `<bolt-button>`  will always render to the Light DOM if initially placed inside a `<form>`  tag before booting up — even if the browser natively supports Shadow DOM.

  3. Like all Bolt components, any individual `<bolt-button>`  can always be forced to render to the Light DOM (if a `no-shadow` attribute is added to the custom element tag.

  4. `<bolt-button>` renders / re-renders as expected when moved around the page by external JS.
    - [ ] In JavaScript-only buttons being rendered to the Shadow DOM
    - [ ] In JavaScript-only buttons being rendered to the Light DOM
    - [ ] In Twig-pre-rendered buttons being rendered to the Shadow DOM
    - [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a  `<form>`)

## Responds to prop changes as expected
  1. Changing the button color attribute in the browser (ex. `primary` to `secondary` triggers the component to visually re-render as expected (including the correct class names being used internally):
    - [ ] In JavaScript-only buttons being rendered to the Shadow DOM
    - [ ] In JavaScript-only buttons being rendered to the Light DOM
    - [ ] In Twig-pre-rendered buttons being rendered to the Shadow DOM
    - [ ] In Twig-pre-rendered buttons being rendered to the Light DOM (including older browsers + when all components are nested inside a  `<form>`)

## Event handlers work as expected		
  1. `<bolt-button>` on-click events are properly attached and work as expected (ex. `<bolt-button>` will toggle the `<bolt-video>` component to start / stop to play when wired up correctly)

  2. `<bolt-button>` on-click events are properly attached and work as expected when buttons are added to the page dynamically 

> For example,  a `<bolt-buttons>` that’s inside a nested card injected via Get Smart Content will respond to click events as expected.

  3. `<bolt-button>` on-click events are properly detached from the page when the element is removed or moved around the page. 

> For example, this means that a previously attached button  with a click handler that is moved around the page (detached and then re-attached) would only fire a single event when interacted with (vs multiple events getting fired).

## Slotted content renders as expected
  1. Slotted content nested inside the`<bolt-button>` when initially booting up is placed inside the correct inner container (ex. `c-bolt-button__item` vs `c-bolt-button__icon`) if a slot attribute is used.

  2. Slotted content nested inside the`<bolt-button>` when initially booting up is placed inside the default button slot (ex. `c-bolt-button__item`) if a slot attribute is not specified.

  3. Every  `<bolt-button>` component that contains a top-level `<a>` or `<button>` HTML element inside (when initially booting up) will repurpose this existing element’s HTML attributes (minus any Bolt-specific CSS classes) when setting up the internally rendered button or link markup.
