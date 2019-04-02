import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
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

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-list> Component', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  test('basic usage', async () => {
    const results = await renderTwig('@bolt-components-list/list.twig', {
      items: ['item 1', 'item 2', 'item 3'],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  display.enum.forEach(async displayChoice => {
    test(`list display: ${displayChoice}`, async () => {
      const results = await renderTwig('@bolt-components-list/list.twig', {
        display: displayChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`list spacing: ${spacingChoice}`, async () => {
      const results = await renderTwig('@bolt-components-list/list.twig', {
        spacing: spacingChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  separator.enum.forEach(async separatorChoice => {
    test(`list separator: ${separatorChoice}`, async () => {
      const results = await renderTwig('@bolt-components-list/list.twig', {
        separator: separatorChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  inset.enum.forEach(async insetChoice => {
    test(`list inset spacing: ${insetChoice}`, async () => {
      const results = await renderTwig('@bolt-components-list/list.twig', {
        inset: insetChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  align.enum.forEach(async alignChoice => {
    test(`list items horizontal alignment: ${alignChoice}`, async () => {
      const results = await renderTwig('@bolt-components-list/list.twig', {
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
      const results = await renderTwig('@bolt-components-list/list.twig', {
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
      const results = await renderTwig('@bolt-components-list/list.twig', {
        tag: tagChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
