Stylistic block layout for displaying actionable icon and text. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-action-blocks
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

Description:
Action blocks work as a group to provide an easy to browse list of links. 

* Can use xlight, light, dark, and xdark themes.
* Can have an image, icon, and/or text
* Should link to content 
* Should be limited to 7 (soft limit) unless we're representing a large list of content that is meant to be scanned
* Can wrap to many rows
* Top aligned by default
* Can be vertically centered
* Are set with a border by default
* Can be borderless
