const { render } = require('@bolt/twig-renderer');
const { media } = require('./fixtures/figure-data');

describe('figure', async () => {
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
