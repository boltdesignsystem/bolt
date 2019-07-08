import { render, renderString } from '@bolt/twig-renderer';

describe('<bolt-form> Component', () => {
  const inputs = [
    {
      placeholder: 'Enter a Title',
      type: 'text',
    },
    {
      placeholder: 'Enter email address',
      type: 'email',
    },
    {
      placeholder: 'Enter Password',
      type: 'password',
    },
    {
      placeholder: 'Enter Search Terms',
      type: 'search',
    },
    {
      placeholder: 'Enter Pin Nmber',
      type: 'number',
    },
    {
      placeholder: 'Enter Phone Number',
      type: 'tel',
    },
  ];

  const display = ['before', 'after'];

  const options = [
    {
      type: 'option',
      value: '',
      label: '- Select an option -',
    },
    {
      type: 'option',
      value: 'option-a',
      label: 'Option A',
    },
    {
      type: 'option',
      value: 'option-b',
      label: 'Option B',
    },
  ];

  inputs.forEach(async inputChoice => {
    test(`input with inputAttribute ${JSON.stringify(
      inputChoice.type,
    )}`, async () => {
      const results = await renderString(
        `{% extends "@bolt-components-form/form-element.twig" %}

          {% set inputAttributes = ${JSON.stringify(inputChoice)} %}

          {% set label %}
            {% include("@bolt-components-form/form-label.twig") with {
              "title": 'Title',
              "displayType": 'floating'
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

  test(`disabled input`, async () => {
    const results = await renderString(
      `{% extends "@bolt-components-form/form-element.twig" %}

          {% set inputAttributes = ${JSON.stringify({
            placeholder: "Don't try to edit this",
            disabled: 'disabled',
          })} %}

          {% set label %}
            {% include("@bolt-components-form/form-label.twig") with {
              "title": 'Title',
              "displayType": 'floating'
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

  test(`radio button`, async () => {
    const results = await renderString(
      `{% extends "@bolt-components-form/form-element.twig" %}

        {% set label %}
          {% include("@bolt-components-form/form-label.twig") with {
            "title": "Single Radio",
            "displayType": "inline-radio",
            "attributes": {
              "for": "radio"
            }
          } %}
        {% endset %}
        
        {% set children %}
          {% include("@bolt-components-form/form-input.twig") with {
            "attributes": {
              "type": "radio",
              "id": "radio",
              "name": ""
            },
        } %}
      {% endset %}`,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test(`checkbox`, async () => {
    const results = await renderString(
      `{% extends "@bolt-components-form/form-element.twig" %}

        {% set label %}
          {% include("@bolt-components-form/form-label.twig") with {
            "title": "Single Checkbox",
            "displayType": "inline-checkbox",
            "attributes": {
              "for": "checkbox"
            }
          } %}
        {% endset %}
        
        {% set children %}
          {% include("@bolt-components-form/form-input.twig") with {
            "attributes": {
              "type": "checkbox",
              "id": "checkbox",
              "name": ""
            },
        } %}
      {% endset %}`,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test(`textarea`, async () => {
    const results = await renderString(
      `{% extends "@bolt-components-form/form-element.twig" %}
      
      {% set label %}
        {% include("@bolt-components-form/form-label.twig") with {
          "title": "Job Description",
          "displayType": "floating"
        } %}
      {% endset %}
      
      {% set children %}
        {% include("@bolt-components-form/form-textarea.twig") with {
          "attributes": {
            "placeholder": "Describe the job",
            "required": true
          }
        } %}
      {% endset %}`,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test(`selection list`, async () => {
    const results = await render('@bolt-components-form/form-select.twig', {
      options,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
