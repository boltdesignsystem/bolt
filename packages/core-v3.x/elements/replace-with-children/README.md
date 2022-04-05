## `<replace-with-children>`

A "helper" custom element that removes a web component's initial Twig-rendered HTML and replaces itself with the custom element's children; as the name implies, "Replace With Children".

For example:

```html
<bolt-test-component foo="bar">
  <replace-with-children class="c-bolt-test-component"
    >Twig-rendered text</replace-with-children
  >
</bolt-test-component>
```

In the example above, once the web component has rendered, "Twig-rendered text" will remain but `<replace-with-children class="c-bolt-test-component">` will have been removed so that the markup around the original text can be fully controlled by the web component's own renderer.

This is mainly used to avoid a content shift when web component rendering replaces the original Twig-rendered content.
