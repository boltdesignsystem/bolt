import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { media } = require('./figure.data');

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

describe('figure', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  });

  Object.keys(media).forEach(async item => {
    test(`figure with ${item}`, async () => {
      const results = await renderTwig('@bolt-components-figure/figure.twig', {
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
