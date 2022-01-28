import {
  render,
  renderString,
  stopServer,
} from '../../../testing/testing-helpers';
import schema from '../action-blocks.schema';
const { spacing, valign } = schema.properties;

describe('<bolt-action-blocks> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await renderString(`
      {% set icon_1 %}
        {% include "@bolt-elements-icon/icon.twig" with {
          name: "download",
          size: "large"
        } %}
      {% endset %}

      {% set icon_2 %}
        {% include "@bolt-elements-icon/icon.twig" with {
          name: "copy-to-clipboard",
          size: "large"
        } %}
      {% endset %}

      {% set icon_3 %}
        {% include "@bolt-elements-icon/icon.twig" with {
          name: "calendar",
          size: "large"
        }%}
      {% endset %}
      {% include '@bolt-components-action-blocks/action-blocks.twig' with {
        items: [
          {
            text: 'Item 1',
            url: '#!',
            media: icon_1,
          },
          {
            text: 'Item 2',
            url: '#!',
            media: icon_2,
          },
          {
            text: 'Item 3',
            url: '#!',
            media: icon_3,
          },
        ],
      } %}
    `);
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Subcomponent
  test('Subcomponent renders as expected', async () => {
    const results = await renderString(`
      {% set icon %}
        {% include "@bolt-elements-icon/icon.twig" with {
          name: "download",
          size: "large"
        } %}
      {% endset %}

      {% include '@bolt-components-action-blocks/action-block.twig' with {
        text: 'Item 1',
        url: '#!',
        media: icon,
      } %}
    `);
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  spacing.enum.forEach(async spacingChoice => {
    test(`Vertical alignment of each block's content: ${spacingChoice}`, async () => {
      const results = await renderString(`
        {% set icon_1 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "download",
            size: "large"
          } %}
        {% endset %}

        {% set icon_2 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "copy-to-clipboard",
            size: "large"
          } %}
        {% endset %}

        {% set icon_3 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "calendar",
            size: "large"
          }%}
        {% endset %}
        {% include '@bolt-components-action-blocks/action-blocks.twig' with {
          spacing: ${JSON.stringify(spacingChoice)},
          items: [
            {
              text: 'Item 1',
              url: '#!',
              media: icon_1,
            },
            {
              text: 'Item 2: this item has more text, so it can demonstrate the vertical alignment',
              url: '#!',
              media: icon_2,
            },
            {
              text: 'Item 3',
              url: '#!',
              media: icon_3,
            },
          ],
        } %}
      `);
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  valign.enum.forEach(async valignChoice => {
    test(`Vertical alignment of each block's content: ${valignChoice}`, async () => {
      const results = await renderString(`
        {% set icon_1 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "download",
            size: "large"
          } %}
        {% endset %}

        {% set icon_2 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "copy-to-clipboard",
            size: "large"
          } %}
        {% endset %}

        {% set icon_3 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "calendar",
            size: "large"
          }%}
        {% endset %}
        {% include '@bolt-components-action-blocks/action-blocks.twig' with {
          valign: ${JSON.stringify(valignChoice)},
          items: [
            {
              text: 'Item 1',
              url: '#!',
              media: icon_1,
            },
            {
              text: 'Item 2',
              url: '#!',
              media: icon_2,
            },
            {
              text: 'Item 3',
              url: '#!',
              media: icon_3,
            },
          ],
        } %}
      `);
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  [true, false].forEach(async borderlessChoice => {
    test(`Border in between each block: ${borderlessChoice}`, async () => {
      const results = await renderString(`
        {% set icon_1 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "download",
            size: "large"
          } %}
        {% endset %}

        {% set icon_2 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "copy-to-clipboard",
            size: "large"
          } %}
        {% endset %}

        {% set icon_3 %}
          {% include "@bolt-elements-icon/icon.twig" with {
            name: "calendar",
            size: "large"
          }%}
        {% endset %}
        {% include '@bolt-components-action-blocks/action-blocks.twig' with {
          borderless: ${JSON.stringify(borderlessChoice)},
          items: [
            {
              text: 'Item 1',
              url: '#!',
              media: icon_1,
            },
            {
              text: 'Item 2',
              url: '#!',
              media: icon_2,
            },
            {
              text: 'Item 3',
              url: '#!',
              media: icon_3,
            },
          ],
        } %}
      `);
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  // Deprecated props
  // @todo: This will be removed with Bolt v3.0
  test('Deprecated props still render as expected', async () => {
    const results = await render(
      '@bolt-components-action-blocks/action-blocks.twig',
      {
        maxItemsPerRow: 2,
        align: 'center',
        border: false,
        contentItems: [
          {
            text: 'Item 1',
            url: '#!',
            icon: {
              name: 'download',
              size: 'large',
            },
          },
          {
            text: 'Item 2',
            url: '#!',
            icon: {
              name: 'copy-to-clipboard',
              size: 'large',
            },
          },
          {
            text: 'Item 3',
            url: '#!',
            icon: {
              name: 'calendar',
              size: 'large',
            },
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
