const { render } = require('@bolt/twig-renderer');
const buttonTemplate = '@bolt-elements-button/button.twig';

describe('Test the Bolt Twig Renderer API', () => {
  test('renders a basic button', async () => {
    const buttonData = {
      content: 'Hello world!',
      attributes: {
        type: 'button',
      },
    };
    const result = await render(buttonTemplate, buttonData);

    expect(result.ok).toEqual(true);
  });

  test('handles missing data', async () => {
    const result = await render(buttonTemplate);

    expect(result.ok).toEqual(true);
  });

  test('handles non-existent template path', async () => {
    const result = await render('@bolt-elements-button/button2.twig', {
      content: 'Hello world 2!',
      attributes: {
        type: 'button',
      },
    });

    expect(result.ok).toEqual(false);
  });

  test('renders the button component correctly', async () => {
    const result = await render(buttonTemplate, {
      content: 'Hello world!2',
      attributes: {
        type: 'button',
      },
    });

    expect(result.html).toMatchSnapshot();
  });

  test('renders attributes on the button component correctly', async () => {
    const result = await render(buttonTemplate, {
      content: 'Hello world!',
      attributes: {
        class: ['u-bolt-margin-bottom-large'],
        type: 'button',
      },
    });

    expect(result.html).toMatchSnapshot();
  });

  test('renders the secondary button correctly', async () => {
    const result = await render(buttonTemplate, {
      content: 'Secondary Button!',
      hierarchy: 'secondary',
      attributes: {
        type: 'button',
      },
    });

    expect(result.html).toMatchSnapshot();
  });
});
