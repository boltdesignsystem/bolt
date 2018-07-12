// const { twigRenderer } = require('./twig-renderer');
const buttonTemplate = '@bolt-components-button/button.twig';


describe.skip('Test the Bolt TwigRender API', () => {
  test('renders a basic button', async () => {
    const buttonData = {
      'text': 'Hello world!',
    };
    const result = await twigRenderer(buttonTemplate, buttonData);

    expect(result.ok).toEqual(true);
  });


  test('handles missing data', async () => {
    const result = await twigRenderer(buttonTemplate);

    expect(result.ok).toEqual(true);
  });


  test('handles non-existent template path', async () => {
    const result = await twigRenderer(
      '@bolt-components-button/button2.twig',
      {
        'text': 'Hello world 2!',
      },
    );

    expect(result.ok).toEqual(false);
  });


  test('renders the button component correctly', async () => {
    const result = await twigRenderer(
      buttonTemplate,
      {
        'text': 'Hello world!2',
      },
    );

    expect(result.html).toMatchSnapshot();
  });


  test('renders attributes on the button component correctly', async () => {
    const result = await twigRenderer(
      buttonTemplate, {
        'text': 'Hello world!',
        'attributes': {
          'class': [
            'u-bolt-margin-bottom-large',
          ],
        },
      },
    );

    expect(result.html).toMatchSnapshot();
  });


  test('renders the secondary button correctly', async () => {
    const result = await twigRenderer(
      buttonTemplate,
      {
        'text': 'Secondary Button!',
        'style': 'secondary',
      },
    );

    expect(result.html).toMatchSnapshot();
  });
});