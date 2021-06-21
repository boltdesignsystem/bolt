## `<ssr-keep>`

A "helper" `custom element` to wrap around portions of HTML you wish to _keep_ after a web component boots-up. It uses a single attribute, `for`, which contains a query selector used to find the closest matching ancestor element and append its inner contents to it. All other HTML up to the matching element will be discarded.

For example, this:

```html
<bolt-accordion-item>
  <div class="c-bolt-accordion-item">
    <div class="c-bolt-accordion-item__trigger">
      <ssr-keep for="bolt-accordion-item">
        <div slot="trigger">Trigger text</div>
      </ssr-keep>
    </div>
    <div class="c-bolt-accordion-item__content">
      <div class="c-bolt-accordion-item__content-inner">
        <ssr-keep for="bolt-accordion-item">
          Accordion content
        </ssr-keep>
      </div>
    </div>
  </div>
</bolt-accordion-item>
```

...will become this after the component connects:

```html
<bolt-accordion-item>
  <div slot="trigger">Trigger text</div>
  Accordion content
</bolt-accordion-item>
```
