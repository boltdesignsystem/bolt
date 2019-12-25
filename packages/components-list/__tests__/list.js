import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '@bolt/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../list.schema.yml'));
const {
  display,
  spacing,
  separator,
  inset,
  align,
  valign,
  tag,
} = schema.properties;

const timeout = 120000;

describe('<bolt-list> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('basic usage', async () => {
    const results = await render('@bolt-components-list/list.twig', {
      items: ['item 1', 'item 2', 'item 3'],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  display.enum.forEach(async displayChoice => {
    test(`list display: ${displayChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        display: displayChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`list spacing: ${spacingChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        spacing: spacingChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  separator.enum.forEach(async separatorChoice => {
    test(`list separator: ${separatorChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        separator: separatorChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  inset.enum.forEach(async insetChoice => {
    test(`list inset spacing: ${insetChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        inset: insetChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  align.enum.forEach(async alignChoice => {
    test(`list items horizontal alignment: ${alignChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        display: 'inline',
        align: alignChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  valign.enum.forEach(async valignChoice => {
    test(`list items vertical alignment: ${valignChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        display: 'inline',
        valign: valignChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  tag.enum.forEach(async tagChoice => {
    test(`list tag: ${tagChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        tag: tagChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Bolt List: items accept renderable objects as content', async () => {
    const results = await renderString(`
      {% set item_1 = create_attribute({'test-attr': 'test-value'}) %}

      {% include "@bolt-components-list/list.twig" with {
        items: [
          item_1
         ]
      } only %}
    `);
    expect(results.html).toContain('test-attr="test-value"');
  });
});
