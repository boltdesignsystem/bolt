import { render, renderString } from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../form.schema.yml'));
const { tag } = schema.properties;

describe('<bolt-list> Component', () => {
  test(`input element usage`, async () => {
    const results = await renderString(
      `{% extends "@bolt-components-form/form-element.twig" %}

        {% set label %}
          {% include("@bolt-components-form/form-label.twig") with {
            "title": title,
            "displayType": labelDisplayType
          } only %}
        {% endset %}
        
        {% set children %}
          {# Default input type is text #}
          {% set inputAttributes = inputAttributes|merge({'type': inputAttributes.type|default('text')}) %}
        
          {% include("@bolt-components-form/form-input.twig") with {
            "attributes": inputAttributes,
            "hasErrors": errors is not empty
          } only %}
        {% endset %}`,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
