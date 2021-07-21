import { render, stopServer, html } from '../../../testing/testing-helpers';
import schema from '../accordion.schema';

const { spacing } = schema.definitions;

const timeout = 120000;

const accordionHTML = `
  <bolt-accordion single>
    <bolt-accordion-item>
      <div slot="trigger">Accordion item 1</div>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
    </bolt-accordion-item>
    <bolt-accordion-item>
      <div slot="trigger">Accordion item 2</div>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
    </bolt-accordion-item>
    <bolt-accordion-item>
      <div slot="trigger">Accordion item 3</div>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
    </bolt-accordion-item>
  </bolt-accordion>
`;

const accordionNoShadowHTML = `
  <bolt-accordion no-shadow>
    <bolt-accordion-item no-shadow>
      <div slot="trigger">Accordion item 1</div>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
    </bolt-accordion-item>
    <bolt-accordion-item no-shadow>
      <div slot="trigger">Accordion item 2</div>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
    </bolt-accordion-item>
    <bolt-accordion-item no-shadow>
      <div slot="trigger">Accordion item 3</div>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
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

  [true, false].forEach(async singleChoice => {
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

  spacing.enum.forEach(async spacingChoice => {
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

  test('Default <bolt-accordion> with Shadow DOM renders', async function() {
    await page.evaluate(async accordionHTML => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = accordionHTML;
      document.body.appendChild(wrapper);
      await customElements.whenDefined('ssr-keep');
      await customElements.whenDefined('bolt-accordion');
      await customElements.whenDefined('bolt-accordion-item');

      const accordion = document.querySelector('bolt-accordion');
      await accordion.firstUpdated;
      const accordionItems = Array.from(
        document.querySelectorAll('bolt-accordion-item'),
      );
      const allElements = [accordion, ...accordionItems];

      await Promise.all(
        allElements.map(element => {
          if (element._wasInitiallyRendered) return;
          return new Promise((resolve, reject) => {
            element.addEventListener('ready', resolve);
            element.addEventListener('error', reject);
          });
        }),
      );

      return accordion.renderRoot.innerHTML;
    }, accordionHTML);

    // Wait for Handorgel to run, starts after component 'ready' event
    await page.waitFor(250);

    const accordionShadowRoot = await page.$eval(
      'bolt-accordion',
      el => el.renderRoot.innerHTML,
    );

    const accordionItemShadowRoot = await page.$eval(
      'bolt-accordion-item',
      el => el.renderRoot.innerHTML,
    );

    const renderedShadowRoot = await html(`<div>${accordionShadowRoot}</div>`);
    const renderedItemShadowRoot = await html(
      `<div>${accordionItemShadowRoot}</div>`,
    );

    expect(renderedShadowRoot.innerHTML).toMatchSnapshot();
    expect(renderedItemShadowRoot.innerHTML).toMatchSnapshot();
  });

  test('Default <bolt-accordion> w/o Shadow DOM renders', async function() {
    await page.evaluate(async accordionNoShadowHTML => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = accordionNoShadowHTML;
      document.body.appendChild(wrapper);
      await customElements.whenDefined('bolt-accordion');
      await customElements.whenDefined('bolt-accordion-item');

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
      );
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
