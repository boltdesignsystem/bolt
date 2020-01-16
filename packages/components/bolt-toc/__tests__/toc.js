import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../toc.schema';
const { status, align } = schema.properties;
const timeout = 120000;

describe('<bolt-toc> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render('@bolt-components-toc/toc.twig', {
      items: [
        {
          content: 'Section One',
          url: '#section-one',
        },
        {
          content: 'Section Two',
          url: '#section-two',
        },
        {
          content: 'Section Three',
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
          content: 'Section One',
          url: '#section-one',
        },
        {
          content: 'Section Two',
          url: '#section-two',
        },
        {
          content: 'Section Three',
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
          content: 'Section One',
          url: '#section-one',
        },
        {
          content: 'Section Two',
          url: '#section-two',
          active: true,
        },
        {
          content: 'Section Three',
          url: '#section-three',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
