const { render } = require('@bolt/twig-renderer');

describe('<bolt-card> Component', async () => {
  test('basic usage', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      media: {
        image: {
          src: '/fixtures/landscape-16x9-mountains.jpg',
          alt: 'Image alt.',
        },
      },
      body: {
        eyebrow: 'This is an eyebrow',
        headline: 'This is a headline',
        paragraph: 'This is a paragraph.',
      },
      actions: [
        {
          text: 'This is a button',
          url: 'https://pega.com',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
