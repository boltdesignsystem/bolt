import { render, stopServer } from '../../../testing/testing-helpers';

describe('<bolt-toc> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render('@bolt-components-toc/toc.twig', {
      items: [
        {
          text: 'Section One',
          url: '#section-one',
        },
        {
          text: 'Section Two',
          url: '#section-two',
        },
        {
          text: 'Section Three',
          url: '#section-three',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  test(`Table of content with a header`, async () => {
    const results = await render('@bolt-components-toc/toc.twig', {
      header: 'This is the header',
      items: [
        {
          text: 'Section One',
          url: '#section-one',
        },
        {
          text: 'Section Two',
          url: '#section-two',
        },
        {
          text: 'Section Three',
          url: '#section-three',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test(`Manuualy set the current item`, async () => {
    const results = await render('@bolt-components-toc/toc.twig', {
      items: [
        {
          text: 'Section One',
          url: '#section-one',
        },
        {
          text: 'Section Two',
          url: '#section-two',
          active: true,
        },
        {
          text: 'Section Three',
          url: '#section-three',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
