import {
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig as vrtConfig,
  $RefParser,
} from '../../../testing/testing-helpers';
const { join } = require('path');
const schemaFilePath = join(__dirname, '../accordion.schema.yml');

const timeout = 120000;

describe('<bolt-accordion> Component', () => {
  let page, schema, props;

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  }, timeout);

  beforeAll(async () => {
    schema = await $RefParser.dereference(schemaFilePath);
    props = schema.properties;
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
      items: [
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
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  props.single.enum.forEach(async singleChoice => {
    test(`expand single items: ${singleChoice}`, async () => {
      const results = await render(
        '@bolt-components-accordion/accordion.twig',
        {
          single: singleChoice,
          items: [
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
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  props.spacing.enum.forEach(async spacingChoice => {
    test(`spacing: ${spacingChoice}`, async () => {
      const results = await render(
        '@bolt-components-accordion/accordion.twig',
        {
          spacing: spacingChoice,
          items: [
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
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Default <bolt-accordion> with Shadow DOM renders', async function() {
    const defaultAccordionShadowRoot = await page.evaluate(() => {
      const accordion = document.createElement('bolt-accordion');
      accordion.innerHTML = `
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
        </bolt-accordion-item>`;

      document.body.appendChild(accordion);
      accordion.updated();

      const child = accordion.querySelector('bolt-accordion-item');
      child.updated();

      return child.renderRoot.innerHTML;
    });

    const renderedShadowDomHTML = await html(defaultAccordionShadowRoot);

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    // @todo: this just renders the <style> tag, same happens in button
    // Is there any point in adding this snapshot?
    // expect(renderedShadowDomHTML).toMatchSnapshot();
  });

  test('Default <bolt-accordion> w/o Shadow DOM renders', async function() {
    const defaultAccordionShadowRoot = await page.evaluate(() => {
      const accordion = document.createElement('bolt-accordion');
      accordion.innerHTML = `
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
        </bolt-accordion-item>`;

      document.body.appendChild(accordion);
      accordion.useShadow = false;
      accordion.updated();

      const child = accordion.querySelector('bolt-accordion-item');
      child.updated();

      return child.renderRoot.innerHTML;
    });

    const renderedShadowDomHTML = await html(defaultAccordionShadowRoot);

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
  });
});
