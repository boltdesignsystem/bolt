import { render } from '@bolt/twig-renderer';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../blockquote.schema.yml'));
const { size, alignItems, border } = schema.properties;

describe('<bolt-blockquote> Component', () => {
  test('basic usage', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
        author: {
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('indent usage', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
        indent: true,
        author: {
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  size.enum.forEach(async option => {
    test(`size variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          size: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  alignItems.enum.forEach(async option => {
    test(`align variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          alignItems: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  border.enum.forEach(async option => {
    test(`border variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          border: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  border.enum.forEach(async option => {
    test(`border variations with inset: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          border: option,
          inset: true,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`advanced usage`, async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
        border: 'horizontal',
        inset: true,
        logo: {
          invert: true,
          src: '/fixtures/paypal.svg',
        },
        author: {
          image: {
            src: '/fixtures/author.jpg',
            lazyload: false,
          },
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
