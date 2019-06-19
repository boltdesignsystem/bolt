import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../video.schema.yml'));

describe('<bolt-video> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('<bolt-video> compiles', async () => {
    const results = await render('@bolt-components-video/video.twig', {
      videoId: '3861325118001',
      accountId: '1900410236',
      playerId: 'r1CAdLzTW',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-video> compiles with a meta description', async () => {
    const results = await render('@bolt-components-video/video.twig', {
      videoId: '3861325118001',
      accountId: '1900410236',
      playerId: 'r1CAdLzTW',
      showMeta: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-video> compiles with a meta description + meta title', async () => {
    const results = await render('@bolt-components-video/video.twig', {
      videoId: '3861325118001',
      accountId: '1900410236',
      playerId: 'r1CAdLzTW',
      showMeta: true,
      showMetaTitle: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-video> compiles with a different `video-id`', async () => {
    const results = await render('@bolt-components-video/video.twig', {
      videoId: '5609376179001',
      accountId: '1900410236',
      playerId: 'r1CAdLzTW',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // tag.enum.forEach(async tagChoice => {
  //   test(`button tag: ${tagChoice}`, async () => {
  //     const results = await render('@bolt-components-button/button.twig', {
  //       text: 'Hello World',
  //       tag: tagChoice,
  //     });
  //     // console.log({ results });
  //     expect(results.ok).toBe(true);
  //     expect(results.html).toMatchSnapshot();
  //   });
  // });
});
