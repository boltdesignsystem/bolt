const { render } = require('@bolt/twig-renderer');
const buttonTemplate = '@bolt-components-button/button.twig';

describe('Test the Bolt Twig Renderer API', () => {
  test('renders a basic button', async () => {
    const buttonData = {
      text: 'Hello world!',
    };
    const result = await render(buttonTemplate, buttonData);

    expect(result.ok).toEqual(true);
  }, 10000);

  test('handles missing data', async () => {
    const result = await render(buttonTemplate);

    expect(result.ok).toEqual(true);
  }, 10000);

  test('handles non-existent template path', async () => {
    const result = await render('@bolt-components-button/button2.twig', {
      text: 'Hello world 2!',
    });

    expect(result.ok).toEqual(false);
  }, 10000);

  test('renders the button component correctly', async () => {
    const result = await render(buttonTemplate, {
      text: 'Hello world!2',
    });

    expect(result.html).toMatchSnapshot();
  }, 10000);

  test('renders attributes on the button component correctly', async () => {
    const result = await render(buttonTemplate, {
      text: 'Hello world!',
      attributes: {
        class: ['u-bolt-margin-bottom-large'],
      },
    });

    expect(result.html).toMatchSnapshot();
  }, 10000);

  test('renders the secondary button correctly', async () => {
    const result = await render(buttonTemplate, {
      text: 'Secondary Button!',
      style: 'secondary',
    });

    expect(result.html).toMatchSnapshot();
  }, 10000);
});
