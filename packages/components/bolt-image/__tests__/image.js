import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../image.schema.yml'));

describe('<bolt-image> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('<bolt-image> with ratio object compiles', async () => {
    const results = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
      alt: 'A Rock Climber',
      lazyload: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-image> with ratio object and lazyloading disabled compiles', async () => {
    const results = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
      alt: 'A Rock Climber',
      lazyload: false,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-image> with max-width of 200px renders as expected', async () => {
    const results = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
      alt: 'A Rock Climber',
      max_width: '200px',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-image> with max-width of 50% renders as expected', async () => {
    const results = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
      alt: 'A Rock Climber',
      max_width: '50%',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
  test('<bolt-image> with max-width and additional style attribute renders as expected', async () => {
    const results = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
      alt: 'A Rock Climber',
      max_width: '200px',
      attributes: {
        style: 'display: block;',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
