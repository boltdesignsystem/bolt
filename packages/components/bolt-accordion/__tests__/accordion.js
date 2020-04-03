import {
  render,
  stopServer,
  html,
  vrtDefaultConfig as vrtConfig,
} from '../../../testing/testing-helpers';
import schema from '../accordion.schema';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
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

  single.enum.forEach(async (singleChoice) => {
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

  spacing.enum.forEach(async (spacingChoice) => {
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

  spacing.enum.forEach(async (spacingChoice) => {
    test(`trigger spacing: ${spacingChoice}`, async () => {
      const results = await render(
        '@bolt-components-accordion/accordion.twig',
        {
          items: [
            {
              trigger: 'Accordion item 1',
              content: 'This is the accordion content.',
              trigger_spacing: spacingChoice,
            },
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
    test(`content spacing: ${spacingChoice}`, async () => {
      const results = await render(
        '@bolt-components-accordion/accordion.twig',
        {
          content_spacing: spacingChoice,
          items: [
            {
              trigger: 'Accordion item 1',
              content: 'This is the accordion content.',
              content_spacing: spacingChoice,
            },
          ],
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

  test('Default <bolt-accordion> with Shadow DOM renders', async function () {
    await page.evaluate(async (accordionHTML) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = accordionHTML;
      document.body.appendChild(wrapper);

      const undefinedElements = document.querySelectorAll(
        'bolt-accordion',
        'bolt-accordion-item',
      );
      const promises = [...undefinedElements].map((elem) =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
    }, accordionHTML);

    // Wait for Handorgel to run, starts after component 'ready' event
    await page.waitFor(250);

    const accordionShadowRoot = await page.$eval(
      'bolt-accordion',
      (el) => el.renderRoot.innerHTML,
    );

    const accordionItemShadowRoot = await page.$eval(
      'bolt-accordion-item',
      (el) => el.renderRoot.innerHTML,
    );

    const renderedShadowRoot = await html(`<div>${accordionShadowRoot}</div>`);
    const renderedItemShadowRoot = await html(
      `<div>${accordionItemShadowRoot}</div>`,
    );

    expect(renderedShadowRoot.innerHTML).toMatchSnapshot();
    expect(renderedItemShadowRoot.innerHTML).toMatchSnapshot();

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('Default <bolt-accordion> w/o Shadow DOM renders', async function () {
    await page.evaluate(async (accordionNoShadowHTML) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = accordionNoShadowHTML;
      document.body.appendChild(wrapper);
      const undefinedElements = document.querySelectorAll(
        'bolt-icon',
        'bolt-accordion',
        'bolt-accordion-item',
      );
      const promises = [...undefinedElements].map((elem) =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
    }, accordionNoShadowHTML);

    // Wait for Handorgel to run, starts after component 'ready' event
    await page.waitFor(250);

    const accordionOuterHTML = await page.evaluate(async () => {
      return document.querySelector('bolt-accordion').outerHTML;
    });

    const accordionRenderedHTML = await html(accordionOuterHTML);
    expect(accordionRenderedHTML).toMatchSnapshot();
  });
});
