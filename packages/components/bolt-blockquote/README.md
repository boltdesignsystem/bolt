Stylistic pull quote styles for all types of layout. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-blockquote
```

### Theme inheritance
This component must be wrapped in the following to inherit correct theme variation:
```
{% embed "@utils/theme-demo.twig" %}
    {% block demo_content %}
        {# component here #}
    {% endblock %}
{% endembed %}
```