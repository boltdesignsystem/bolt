import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { media } = require('./figure.data');

describe('figure', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

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
