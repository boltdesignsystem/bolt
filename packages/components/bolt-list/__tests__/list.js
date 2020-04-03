import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig,
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
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  }, timeout);

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  }, timeout);

  test('basic usage', async () => {
    const results = await render('@bolt-components-list/list.twig', {
      items: ['item 1', 'item 2', 'item 3'],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  display.enum.forEach(async (displayChoice) => {
    test(`list display: ${displayChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        display: displayChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async (spacingChoice) => {
    test(`list spacing: ${spacingChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        spacing: spacingChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  separator.enum.forEach(async (separatorChoice) => {
    test(`list separator: ${separatorChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        separator: separatorChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  inset.enum.forEach(async (insetChoice) => {
    test(`list inset spacing: ${insetChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        inset: insetChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  align.enum.forEach(async (alignChoice) => {
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

  valign.enum.forEach(async (valignChoice) => {
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

  tag.enum.forEach(async (tagChoice) => {
    test(`list tag: ${tagChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        tag: tagChoice,
        items: ['item 1', 'item 2', 'item 3'],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  nowrap.enum.forEach(async (nowrapChoice) => {
    test(`list nowrap: ${nowrapChoice}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        display: 'inline',
        nowrap: nowrapChoice,
        items: [
          'item 1',
          'item 2',
          'item 3',
          'item 4',
          'item 5',
          'item 6',
          'item 7',
          'item 8',
          'item 9',
          'item 10',
          'item 11',
          'item 12',
          'item 13',
          'item 14',
          'item 15',
          'item 16',
          'item 17',
          'item 18',
          'item 19',
        ],
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

  test(`list custom separator color`, async () => {
    // Use 'block' (default) and bold color like 'red' so that VRT catches regressions,
    // with 'inline' or subtler colors it passes.
    const results = await render('@bolt-components-list/list.twig', {
      separator: 'solid',
      items: ['item 1', 'item 2', 'item 3'],
      attributes: {
        style: ['--bolt-list-item-border-color: red;'],
      },
    });

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    await page.evaluate(async (results) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = results.html;
      document.body.appendChild(wrapper);
      const list = document.querySelector('bolt-list');

      if (list._wasInitiallyRendered) return;
      return new Promise((resolve, reject) => {
        list.addEventListener('ready', resolve);
        list.addEventListener('error', reject);
      });
    }, results);

    // @todo: `html()` (`@open-wc/testing-helpers`) is not handling CSS custom properties properly.
    // It converts `--` to `-`. Do not include code snapshot until that's resolved.

    // const listInnerHTML = await page.evaluate(async () => {
    //   return document.querySelector('bolt-list').outerHTML;
    // });

    // const renderedHTML = await html(listInnerHTML);
    // expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });
});
