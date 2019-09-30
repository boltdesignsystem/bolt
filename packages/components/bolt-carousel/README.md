The `<bolt-carousel>` provides all the basic functionality expected with a modern carousel with a sliding effect, left/right arrow buttons, and page dots. The user can move between each carousel slide with touch, the mouse, the keyboard, or a trackpad.

Under the hood, the `<bolt-carousel>` component uses the excellent <a href="https://idangero.us/swiper/">Swiper</a> library to provide top-notice mobile, responsive, and touch support.

###### Install via yarn

```
yarn add @bolt/components-carousel
```

<h2 class="c-bds-docs__heading-fragment c-bolt-headline c-bolt-headline--bold c-bolt-headline--xxlarge c-bolt-headline--link" id="usage"><bolt-link url="#usage" is-headline>Usage</bolt-link></h2>
<details open>
  <summary><strong>Via Web Component</strong></summary>
  <section>
    <bolt-code-snippet markdown="0" lang="html">
      <pre class="c-bolt-code-snippet c-bolt-code-snippet-syntax--light"><code is="shadow-root">&lt;bolt-carousel&gt;
  &lt;bolt-carousel-slide&gt;
    Slide 1
  &lt;/bolt-carousel-slide&gt;
  &lt;bolt-carousel-slide&gt;
    Slide 2
  &lt;/bolt-carousel-slide&gt;
  &lt;bolt-carousel-slide&gt;
    Slide 3
  &lt;/bolt-carousel-slide&gt;
&lt;/bolt-carousel&gt;</code></pre>
    </bolt-code-snippet>
  </section>
</details>
<details>
  <summary><strong>Via Twig</strong></summary>
  <section>
    <bolt-code-snippet markdown="0" lang="twig">
      <pre class="c-bolt-code-snippet c-bolt-code-snippet-syntax--light"><code is="shadow-root">{% include "@bolt-components-carousel/carousel.twig" with {
  slides: [
    'Slide 1',
    'Slide 2',
    'Slide 3',
  ]
} only %}</code></pre>
    </bolt-code-snippet>
  </section>
</details>

### Guidelines

The `<bolt-carousel>` component is most appropriate when:

- You want to present to the user with a collection of images, or a mixture of images and text content.
- You want to allow the user focus on a single item at a time.
- The total number of items to display is relative small (between 2 and 10 items).

<aside class="c-bds-callout c-bds-callout--notice">
  <p>By default the Carousel component will create a pagination dot for each item, which would be unweildy for larger collections.</p>

  <p>If you have a large number of items to display, consider enabling <code>freeScroll</code> mode or consider if a carousel is the ideal component to use for a particular use case.</p>
</aside>
