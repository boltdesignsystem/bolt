import { render } from '@bolt/twig-renderer';

describe('<bolt-button-group> Component', () => {
  test('basic usage', async () => {
    const results = await render(
      '@bolt-components-button-group/button-group.twig',
      {
        buttons: [
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'About Pega',
            style: 'secondary',
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('icon only button group', async () => {
    const results = await render(
      '@bolt-components-button-group/button-group.twig',
      {
        buttons: [
          {
            text: 'Example',
            style: 'primary',
            size: 'xsmall',
            iconOnly: true,
            icon: {
              name: 'close',
            },
            border_radius: 'full',
          },
          {
            text: 'About Pega',
            style: 'secondary',
            size: 'xsmall',
            iconOnly: true,
            icon: {
              name: 'close',
            },
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('button group quantity 3', async () => {
    const results = await render(
      '@bolt-components-button-group/button-group.twig',
      {
        buttons: [
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('button group quantity 4', async () => {
    const results = await render(
      '@bolt-components-button-group/button-group.twig',
      {
        buttons: [
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('button group quantity 5', async () => {
    const results = await render(
      '@bolt-components-button-group/button-group.twig',
      {
        buttons: [
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
          {
            text: 'Learn More',
            style: 'primary',
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('content items button group', async () => {
    const results = await render(
      '@bolt-components-button-group/button-group.twig',
      {
        contentItems: [
          {
            pattern: 'button',
            text: 'Example',
            style: 'primary',
            size: 'xsmall',
            iconOnly: true,
            border_radius: 'full',
            icon: {
              name: 'close',
            },
          },
          {
            pattern: 'button',
            text: 'About Pega',
            style: 'secondary',
            size: 'xsmall',
            iconOnly: true,
            icon: {
              name: 'close',
            },
          },
        ],
        content: 'This is text with the <bold>tags</bold> stripped.',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
