Button is a branded component to convey call to action. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-button
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