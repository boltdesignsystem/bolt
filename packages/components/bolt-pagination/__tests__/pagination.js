import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../pagination.schema';
const { align } = schema.properties;

describe('<bolt-pagination> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render(
      '@bolt-components-pagination/pagination.twig',
      {
        current: 5,
        total: 10,
        first: {
          href: '#!',
        },
        previous: {
          href: '#!',
        },
        pages: {
          3: {
            href: '#!',
          },
          4: {
            href: '#!',
          },
          5: {
            href: '#!',
          },
          6: {
            href: '#!',
          },
          7: {
            href: '#!',
          },
        },
        next: {
          href: '#!',
        },
        last: {
          href: '#!',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  align.enum.forEach(async alignChoice => {
    test(`Horizontal alignment: ${alignChoice}`, async () => {
      const results = await render(
        '@bolt-components-pagination/pagination.twig',
        {
          align: alignChoice,
          current: 1,
          total: 5,
          pages: {
            1: {
              href: '#!',
            },
            2: {
              href: '#!',
            },
            3: {
              href: '#!',
            },
            4: {
              href: '#!',
            },
            5: {
              href: '#!',
            },
          },
          next: {
            href: '#!',
          },
          last: {
            href: '#!',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
