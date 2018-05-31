The `<bolt-nav-indicator> web component handles the display and animations of the active / inactive `<navlink>` links contained inside.

As the `<bolt-nav-indicator>` is a JavaScript and Sass-only web component, no Twig file is actually required. Components wiring up to use the `<bolt-nav-indicator>` wrap the containing unordered-list of `<navlinks>` and this component does all the heavy lifting!

```
<bolt-nav-indicator>
  <ul class="c-bolt-nav-priority__list c-bolt-nav-priority__primary">
    {% for item in links %}
      <li class="c-bolt-nav-priority__item">
        {% include "@bolt-components-navlink/navlink.twig" with item only %}
      </li>
    {% endfor %}
  </ul>
</bolt-nav-indicator>
```