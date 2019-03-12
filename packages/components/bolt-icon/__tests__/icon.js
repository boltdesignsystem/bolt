const { render } = require('@bolt/twig-renderer');

describe('<bolt-icon> Component', () => {
  test('basic usage', async () => {
    const results = await render('@bolt-components-icon/icon.twig', {
      name: 'add-open',
      background: 'square',
      size: 'medium',
      color: 'teal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with attributes', async () => {
    const results = await render('@bolt-components-icon/icon.twig', {
      attributes: {
        style: [
          '--bolt-theme-icon-background: #e64b18;',
          '--bolt-theme-icon: #FFF;',
          '--bolt-theme-icon-background-opacity: 1;',
        ],
      },
      name: 'add-open',
      background: 'square',
      size: 'medium',
      color: 'teal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
