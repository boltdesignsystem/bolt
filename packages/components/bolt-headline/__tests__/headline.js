import { render } from '@bolt/twig-renderer';

describe('<bolt-icon> Component', () => {
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
});
