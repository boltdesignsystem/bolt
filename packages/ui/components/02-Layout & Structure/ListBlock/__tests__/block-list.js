import { render } from '@bolt/twig-renderer';

describe('<bolt-block-list> Component', () => {
  test('basic usage', async () => {
    const results = await render(
      '@bolt-components-block-list/block-list.twig',
      {
        items: ['List Item 1', 'List Item 2', 'List Item 3'],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('block list with Drupal theme attribute', async () => {
    const results = await render(
      '@bolt-components-block-list/block-list.twig',
      {
        attributes: {
          class: ['t-bolt-dark'],
        },
        items: ['List Item 1', 'List Item 2', 'List Item 3'],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
