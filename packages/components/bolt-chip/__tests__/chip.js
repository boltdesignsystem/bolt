import { render } from '@bolt/twig-renderer';
import schema from '../chip.schema';
const { size } = schema.properties;

describe('chip', () => {
  test('basic usage', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'Hello World',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('url usage', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'Has URL',
      url: 'https://google.com',
      target: '_blank',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('icon usage', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'Icon before',
      icon: {
        name: 'check',
        position: 'before',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  size.enum.forEach(async option => {
    test(`chip size: ${option}`, async () => {
      const results = await render('@bolt-components-chip/chip.twig', {
        text: 'Chip size',
        size: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('icon only', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'Show more',
      icon: {
        name: 'more',
      },
      iconOnly: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
