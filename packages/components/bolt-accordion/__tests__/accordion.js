import {
  render,
  stopServer,
  html,
  vrtDefaultConfig as vrtConfig,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../accordion.schema.yml'));
const { single } = schema.properties;
const { spacing } = schema.definitions;

const timeout = 120000;

const accordionHTML = `
  <bolt-accordion>
    <bolt-accordion-item>
      <bolt-text slot="trigger">Accordion item 1</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
    <bolt-accordion-item>
      <bolt-text slot="trigger">Accordion item 2</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
    <bolt-accordion-item>
      <bolt-text slot="trigger">Accordion item 3</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
  </bolt-accordion>
`;

const accordionNoShadowHTML = `
  <bolt-accordion no-shadow>
    <bolt-accordion-item no-shadow>
      <bolt-text slot="trigger">Accordion item 1</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
    <bolt-accordion-item no-shadow>
      <bolt-text slot="trigger">Accordion item 2</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
    <bolt-accordion-item no-shadow>
      <bolt-text slot="trigger">Accordion item 3</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
  </bolt-accordion>
`;

const accordionTwigItems = [
  {
    trigger: 'Accordion item 1',
    content: 'This is the accordion content.',
  },
  {
    trigger: 'Accordion item 2',
    content: 'This is the accordion content.',
  },
  {
    trigger: 'Accordion item 3',
    content: 'This is the accordion content.',
  },
];

describe('<bolt-accordion> Component', () => {
  let page;

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

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, timeout);

  test('basic usage', async () => {
    const results = await render('@bolt-components-accordion/accordion.twig', {
      items: accordionTwigItems,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  single.enum.forEach(async singleChoice => {
    test(`expand single items: ${singleChoice}`, async () => {
      const results = await render(
        '@bolt-components-accordion/accordion.twig',
        {
          single: singleChoice,
          items: accordionTwigItems,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`spacing: ${spacingChoice}`, async () => {
      const results = await render(
        '@bolt-components-accordion/accordion.twig',
        {
          spacing: spacingChoice,
          items: accordionTwigItems,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`Inactive item`, async () => {
    const results = await render('@bolt-components-accordion/accordion.twig', {
      items: [
        {
          trigger: 'Active accordion item',
          content: 'This is the accordion content.',
        },
        {
          trigger: 'Inactive accordion item',
          content: 'This is the accordion content.',
          inactive: true,
        },
        {
          trigger: 'Active accordion item',
          content: 'This is the accordion content.',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-accordion> with Shadow DOM renders', async function() {
    const accordionShadowRoot = await page.evaluate(async accordionHTML => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = accordionHTML;
      document.body.appendChild(wrapper);

      const accordion = document.querySelector('bolt-accordion');
      const accordionItems = Array.from(
        document.querySelectorAll('bolt-accordion-item'),
      );
      const allElements = [accordion, ...accordionItems];

      return await Promise.all(
        allElements.map(element => {
          if (element._wasInitiallyRendered) return;
          return new Promise((resolve, reject) => {
            element.addEventListener('ready', resolve);
            element.addEventListener('error', reject);
          });
        }),
      ).then(() => {
        return accordion.renderRoot.innerHTML;
      });
    }, accordionHTML);

    const accordionItemShadowRoot = await page.evaluate(async () => {
      const item = document.querySelector('bolt-accordion-item');
      return item.renderRoot.innerHTML;
    });

    const renderedShadowRoot = await html(`<div>${accordionShadowRoot}</div>`);
    const renderedItemShadowRoot = await html(
      `<div>${accordionItemShadowRoot}</div>`,
    );

    expect(renderedShadowRoot.innerHTML).toMatchSnapshot();
    expect(renderedItemShadowRoot.innerHTML).toMatchSnapshot();

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('Default <bolt-accordion> w/o Shadow DOM renders', async function() {
    const accordionOuterHTML = await page.evaluate(
      async accordionNoShadowHTML => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = accordionNoShadowHTML;
        document.body.appendChild(wrapper);

        const accordion = document.querySelector('bolt-accordion');
        const accordionItems = Array.from(
          document.querySelectorAll('bolt-accordion-item'),
        );
        const allElements = [accordion, ...accordionItems];

        return await Promise.all(
          allElements.map(element => {
            if (element._wasInitiallyRendered) return;
            return new Promise((resolve, reject) => {
              element.addEventListener('ready', resolve);
              element.addEventListener('error', reject);
            });
          }),
        ).then(() => {
          return accordion.outerHTML;
        });
      },
      accordionNoShadowHTML,
    );

    const accordionRenderedHTML = await html(accordionOuterHTML);
    expect(accordionRenderedHTML).toMatchSnapshot();
  });
});
