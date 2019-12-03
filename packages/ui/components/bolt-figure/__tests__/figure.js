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
      const data = JSON.stringify(media[item]);
      const results = await renderString(`
        {% include '@bolt-components-figure/figure.twig' with {
          media: {
            content: include('@bolt-components-${item}/${item}.twig', ${data})
          },
          caption: 'Figure with ${item}.'
         } %}
      `);
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });

    test(`figure with deprecated "${item}" prop still renders`, async () => {
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
