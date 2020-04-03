import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../banner.schema';
const { status, align } = schema.properties;
const timeout = 120000;

describe('<bolt-banner> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render('@bolt-components-banner/banner.twig', {
      content: 'This is a banner',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  status.enum.forEach(async (statusChoice) => {
    test(`Status of the banner message: ${statusChoice}`, async () => {
      const results = await render('@bolt-components-banner/banner.twig', {
        content: `This banner is trying to convey ${statusChoice}`,
        status: statusChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  align.enum.forEach(async (alignChoice) => {
    test(`Text alignment: ${alignChoice}`, async () => {
      const results = await render('@bolt-components-banner/banner.twig', {
        content: `The text is aligned to the ${alignChoice}`,
        align: alignChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
