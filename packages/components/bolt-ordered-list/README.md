Stylistic numbered list for article content.

### Install via NPM
```
npm install @bolt/components-ordered-list
```

## Theme inheritance
This component must be wrapped in the following to inherit correct theme variation:
```
{% embed "@utils/theme-demo.twig" %}
    {% block demo_content %}
        {# component here #}
    {% endblock %}
{% endembed %}
```