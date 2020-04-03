import {
  render,
  renderString,
  stopServer,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../device-viewer.schema.yml'));
const { deviceName, color, orientation } = schema.properties;

describe('<bolt-device-viewer> Component', () => {
  afterAll(async () => {
    await stopServer();
  });

  test('basic usage', async () => {
    const results = await render(
      '@bolt-components-device-viewer/device-viewer.twig',
      {
        device: 'iphone8',
        orientation: 'portrait',
        color: 'white',
        image: {
          src: '/fixtures/device-screenshot--phone.jpg',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  deviceName.enum.forEach(async (deviceChoice) => {
    test(`decvice-viewer display: ${deviceChoice}`, async () => {
      const results = await render(
        '@bolt-components-device-viewer/device-viewer.twig',
        {
          device: deviceChoice,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  color.enum.forEach(async (colorChoice) => {
    test(`device-viewer display: ${colorChoice}`, async () => {
      const results = await render(
        '@bolt-components-device-viewer/device-viewer.twig',
        {
          device: 'iphone8',
          color: colorChoice,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  orientation.enum.forEach(async (orientationChoice) => {
    test(`device-viewer display: ${orientationChoice}`, async () => {
      const results = await render(
        '@bolt-components-device-viewer/device-viewer.twig',
        {
          device: 'iphone8',
          orientation: orientationChoice,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('usage with magnification', async () => {
    const results = await render(
      '@bolt-components-device-viewer/device-viewer.twig',
      {
        device: 'ipad',
        orientation: 'portrait',
        color: 'white',
        image: {
          src: '/fixtures/device-screenshot--tablet-portrait.jpg',
        },
        magnify: true,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
