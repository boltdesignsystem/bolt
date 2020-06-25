import { render, stopServer, html } from '../../../testing/testing-helpers';
import schema from '../headline.schema';
const { tag, size, align, transform } = schema.properties;

describe('<bolt-headline> Component', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  });

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  });

  test('basic usage headline', async () => {
    const results = await render('@bolt-components-headline/headline.twig', {
      text: 'this is a headline',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage subheadline', async () => {
    const results = await render('@bolt-components-headline/subheadline.twig', {
      text: 'this is an subheadline',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage eyebrow', async () => {
    const results = await render('@bolt-components-headline/eyebrow.twig', {
      text: 'this is an eyebrow',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
  test('basic usage text', async () => {
    const results = await render('@bolt-components-headline/text.twig', {
      text: 'this is text',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
  test('basic usage lead', async () => {
    const results = await render('@bolt-components-headline/lead.twig', {
      text: 'this is a lead',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage headline with attributes', async () => {
    const results = await render('@bolt-components-headline/headline.twig', {
      attributes: {
        'foo bar': 'baz',
      },
      text: 'this is a headline',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  tag.enum.forEach(displayChoice => {
    test(`tag display: ${displayChoice}`, async () => {
      const results = await render('@bolt-components-headline/headline.twig', {
        tag: displayChoice,
        text: 'Some text',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  align.enum.forEach(alignmentChoice => {
    test(`text alignment: ${alignmentChoice}`, async () => {
      const results = await render('@bolt-components-headline/headline.twig', {
        align: alignmentChoice,
        text: 'Some text',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  size.enum.forEach(sizeChoice => {
    const fontWeight = ['bold', 'regular', 'semibold'];

    fontWeight.forEach(weightChoice => {
      test(`Sizes at all varient font weights: ${sizeChoice}, ${weightChoice}`, async () => {
        const results = await render(
          '@bolt-components-headline/headline.twig',
          {
            size: sizeChoice,
            weight: weightChoice,
            text: 'Some text',
          },
        );
        expect(results.ok).toBe(true);
        expect(results.html).toMatchSnapshot();
      });
    });
  });

  size.enum.forEach(sizeChoice => {
    const fontStyle = ['normal', 'italic'];

    fontStyle.forEach(fontChoice => {
      test(`Sizes at all varient font styles: ${sizeChoice}, ${fontChoice}`, async () => {
        const results = await render(
          '@bolt-components-headline/headline.twig',
          {
            size: sizeChoice,
            style: fontChoice,
            text: 'Some text',
          },
        );
        expect(results.ok).toBe(true);
        expect(results.html).toMatchSnapshot();
      });
    });
  });

  transform.enum.forEach(caseChoice => {
    test(`text casing: ${caseChoice}`, async () => {
      const results = await render('@bolt-components-headline/headline.twig', {
        transform: caseChoice,
        text: 'Some text',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('headline with associated link', async () => {
    const results = await render('@bolt-components-headline/headline.twig', {
      url: 'www.testurl.com',
      text: 'this is a headline',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('headline with icon', async () => {
    const results = await render('@bolt-components-headline/headline.twig', {
      icon: 'check',
      text: 'this is a headline',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<span>-based Headlines do not overlap with neighboring <p> tags', async () => {
    const results = await render('@bolt-components-headline/headline.twig', {
      text: 'This is a Headline',
      tag: 'span',
    });

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const headlineHTML = await page.evaluate(async results => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        ${results.html}
        <p>Example content next to Headline.</p>
      `;
      document.body.appendChild(wrapper);
      return wrapper.innerHTML;
    }, results);

    const renderedHTML = await html(headlineHTML);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('<span>-based Headlines horizontally align properly.', async () => {
    const results = await render('@bolt-components-headline/headline.twig', {
      text: 'This is a Headline',
      tag: 'span',
      align: 'center',
    });

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const headlineHTML = await page.evaluate(async results => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        ${results.html}
      `;
      document.body.appendChild(wrapper);
      return wrapper.innerHTML;
    }, results);

    const renderedHTML = await html(headlineHTML);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });
});
