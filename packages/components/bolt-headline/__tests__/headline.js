import { render, stopServer, html } from '../../../testing/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../headline.schema.yml'));
const { tag, size, align, transform } = schema.properties;

describe('<bolt-headline> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

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
});
