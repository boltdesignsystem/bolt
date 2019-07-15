## `<replace-with-children>`

A "helper" `custom element` in the Bolt Design System to easily remove a Web Component's initial server-side / Twig-rendered HTML when booting up and replace itself with the custom element's children; as the name implies, "Replace With Children".

A great use case of this is with the `<bolt-button>` component which might output some initial HTML similar to this (when serverside-rendered):

```html
<bolt-button align="center" variant="primary" size="medium">
  <button class="c-bolt-button  c-bolt-button--medium  c-bolt-button--primary c-bolt-button--center" is="shadow-root">
    <replace-with-children class="c-bolt-button__item">Button w/ Icon `after` Text</replace-with-children>
    <replace-with-children class="c-bolt-button__icon">
      <bolt-icon name="chevron-right" slot="after"></bolt-icon>
    </replace-with-children>
  </button>
</bolt-button>
```

The thing is, most of this HTML isn't technically needed to render our Web Component in a clean, semantic way. In fact, most of it isn't *technically* needed to render out the component:

```html
<!-- This totally works if we wanted to customize the data or attributes on the semantic `<button>` tag that lives in our custom element -->
<bolt-button align="center" variant="primary" size="medium">
  <button is="shadow-root" type="submit" data-uuid="foo">
    Button w/ Icon `after` Text
    <bolt-icon name="chevron-right" slot="after"></bolt-icon>
  </button>
</bolt-button>

<!-- But if not, this also works! -->
<bolt-button align="center" variant="primary" size="medium">
  Button w/ Icon `after` Text
  <bolt-icon name="chevron-right" slot="after"></bolt-icon>
</bolt-button>
```

That's where this helper element comes in: acting as a placeholder for styling non-semantic HTML before the JS kicks in. Once it does, throw away the markup that the component doesn't need / use without losing any valuable data or content.