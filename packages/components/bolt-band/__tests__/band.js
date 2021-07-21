import {
  render,
  renderString,
  stopServer,
} from '../../../testing/testing-helpers';
import schema from '../band.schema';
const { size, theme, tag } = schema.properties;

const timeout = 120000;

describe('<bolt-band> Component', () => {
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
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render('@bolt-components-band/band.twig', {
      content: 'This is a band.',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  size.enum.forEach(async sizeChoice => {
    test(`Size of the band: ${sizeChoice}`, async () => {
      const results = await render('@bolt-components-band/band.twig', {
        size: sizeChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async themeChoice => {
    test(`Theme of the band: ${themeChoice}`, async () => {
      const results = await render('@bolt-components-band/band.twig', {
        theme: themeChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  tag.enum.forEach(async tagChoice => {
    test(`Semantic tag usage: ${tagChoice}`, async () => {
      const results = await render('@bolt-components-band/band.twig', {
        tag: tagChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Full bleed usage', async function() {
    const renderedHTML = await renderString(`
      {% include "@bolt-components-band/band.twig" with {
        theme: "dark",
        full_bleed: false,
        content: "This band is not full bleed.",
      } only %}
      {% include "@bolt-components-band/band.twig" with {
        theme: "xdark",
        full_bleed: true,
        content: "This band is full bleed.",
      } only %}
    `);

    expect(renderedHTML).toMatchSnapshot();
  });

  test(`Pinned content usage`, async () => {
    const results = await render('@bolt-components-band/band.twig', {
      size: 'large',
      content: 'This is a band.',
      pinned_content: {
        upper: [
          {
            content: 'upper pinned 1',
          },
          {
            content: 'upper pinned 2',
          },
          {
            content: 'upper pinned 3',
          },
        ],
        lower: [
          {
            content: 'lower pinned 1',
          },
          {
            content: 'lower pinned 2',
          },
          {
            content: 'lower pinned 3',
          },
        ],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Nested bands usage', async function() {
    const renderedHTML = await renderString(`
      {% set parent_band_content %}
        {% include "@bolt-components-headline/headline.twig" with {
          size: "xxxlarge",
          text: "This Band Has 2 Bands Nested Inside",
        } only %}
        {% include "@bolt-components-band/band.twig" with {
          size: "xsmall",
          theme: "light",
          full_bleed: false,
          content: "Nested band 1",
        } only %}
        {% include "@bolt-components-band/band.twig" with {
          size: "large",
          theme: "xlight",
          full_bleed: false,
          content: "Nested band 2",
        } only %}
      {% endset %}
      {% include "@bolt-components-band/band.twig" with {
        theme: "xdark",
        content: parent_band_content,
      } only %}
    `);

    expect(renderedHTML).toMatchSnapshot();
  });
});
