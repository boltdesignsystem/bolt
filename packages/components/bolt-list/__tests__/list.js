import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
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
  nowrap,
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

  nowrap.enum.forEach(async nowrapChoice => {
    test(`list nowrap: ${nowrapChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        display: 'inline',
        nowrap: nowrapChoice,
        items: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10', 'item 11', 'item 12', 'item 13', 'item 14', 'item 15', 'item 16', 'item 17', 'item 18', 'item 19'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
