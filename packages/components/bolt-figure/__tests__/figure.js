const { render } = require('@bolt/twig-renderer');
const { media } = require('./figure-data');

describe('figure', async () => {
  test('basic figure', async () => {
    const results = await render('@bolt-components-figure/figure.twig', {
      media: {
        image: {
          src: '/images/placeholders/500x500.jpg',
          lazyload: false,
        },
      },
      caption: `Figure caption`,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  Object.keys(media).forEach(async item => {
    test(`figure with ${item}`, async () => {
      const results = await render('@bolt-components-figure/figure.twig', {
        media: {
          [item]: media[item],
        },
        caption: `Figure with ${item}.`,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
