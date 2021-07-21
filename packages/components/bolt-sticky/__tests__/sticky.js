import { renderString, stopServer } from '../../../testing/testing-helpers';

describe('<bolt-sticky> Component', () => {
  test('basic usage', async () => {
    afterAll(async () => {
      await stopServer();
    });

    const results = await renderString(
      `
      <div style="height:50vh;background-color:lightgray;"></div>

      {% embed "@bolt-components-sticky/sticky.twig" %}
        {% block sticky_content %}
          <div style="color:white;background-color:red">
            First sticky item
          </div>
        {% endblock %}
      {% endembed %}

      <div style="height:100vh;background-color:lightgray;"></div>

      {% embed "@bolt-components-sticky/sticky.twig" %}
        {% block sticky_content %}
          <div style="background-color: white">
            Second sticky item
          </div>
        {% endblock %}
      {% endembed %}

      <div style="height:100vh;background-color:lightgray;"></div>

      {% embed "@bolt-components-sticky/sticky.twig" %}
        {% block sticky_content %}
          <div style="color:white;background-color:blue">
            Third sticky item
          </div>
        {% endblock %}
      {% endembed %}

      <div style="height:100vh;background-color:lightgray;"></div>
        `,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
