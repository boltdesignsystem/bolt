import { render, stopServer } from '../../../testing/testing-helpers';

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
  test('<bolt-image> should always render alt attribute on <img> tags', async () => {
    const result1 = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
      alt: '',
    });
    expect(result1.ok).toBe(true);
    expect(result1.html).toMatchSnapshot();

    const result2 = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
    });
    expect(result2.ok).toBe(true);
    expect(result2.html).toMatchSnapshot();
  });
});
