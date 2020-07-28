import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../tooltip.schema';
const { placement, uuid } = schema.properties;
const timeout = 120000;

describe('<bolt-tooltip> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render('@bolt-components-tooltip/tooltip.twig', {
      trigger: 'CRM',
      content: 'Customer relationship management',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Advanced Usage
  test('Advanced usage: adding tooltip to button', async () => {
    const results = await render('@bolt-components-tooltip/tooltip.twig', {
      trigger: '<bolt-button>Download</bolt-button>',
      content: 'File size: 25MB',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  placement.enum.forEach(async placementChoice => {
    test(`Placement of the tooltip bubble: ${placementChoice}`, async () => {
      const results = await render('@bolt-components-tooltip/tooltip.twig', {
        trigger: 'CRM',
        content: 'Customer relationship management',
        placement: placementChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`UUID of the tooltip`, async () => {
    const results = await render('@bolt-components-tooltip/tooltip.twig', {
      trigger: 'CRM',
      content: 'Customer relationship management',
      uuid: 'custom-unique-id',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
