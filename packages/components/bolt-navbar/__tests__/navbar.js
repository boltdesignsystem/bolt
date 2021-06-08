import {
  render,
  stopServer,
  renderWC,
  renderString,
} from '../../../testing/testing-helpers';
import schema from '../navbar.schema';
const componentSelector = 'bolt-navbar';
const { title, links } = schema.properties;
let page, fixtures;

afterAll(async () => {
  await stopServer();
  await page.close();
}, 100);

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const shortLinks = {
    links: [
      {
        text: 'Components',
        url: '/pattern-lab/index.html',
      },
      {
        text: 'Docs',
        url: '/docs/getting-started/index.html',
      },
      {
        text: 'Releases',
        url: 'https://github.com/bolt-design-system/bolt/releases',
        attributes: {
          target: '_blank',
        },
      },
      {
        text: 'Github',
        url: 'https://github.com/bolt-design-system/bolt',
        attributes: {
          target: '_blank',
        },
        icon: {
          name: 'github',
          position: 'after',
        },
      },
    ],
  };

  const longLinks = {
    links: [
      {
        text: 'Components',
        url: '/pattern-lab/index.html',
      },
      {
        text: 'Docs',
        url: '/docs/getting-started/index.html',
      },
      {
        text: 'Releases',
        url: 'https://github.com/bolt-design-system/bolt/releases',
        attributes: {
          target: '_blank',
        },
      },
      {
        text: 'Github',
        url: 'https://github.com/bolt-design-system/bolt',
        attributes: {
          target: '_blank',
        },
        icon: {
          name: 'github',
          position: 'after',
        },
      },
    ],
  };

  fixtures = {
    shortLinks,
    longLinks,
  };
});

describe('Bolt Navbar', () => {
  test(`Navbar with 4 short links`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      theme: 'xdark',
      width: 'auto',
      title: {
        tag: 'h1',
        text:
          'Bolt<span class="u-bolt-hidden u-bolt-inline@xlarge"> Design System</span></span>',
        url: '/',
        icon: {
          name: 'bolt-logo-colored',
        },
      },
      ...fixtures.shortLinks,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar with 6 lengthy links`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      title: {
        tag: 'h2',
        text: 'Navbar with links',
        icon: {
          name: 'marketing-gray',
        },
      },
      ...fixtures.longLinks,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt navbar Props', () => {
  test(`Navbar without links`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      title: {
        tag: 'h2',
        text: 'Navbar without links',
        icon: {
          name: 'marketing-gray',
        },
      },
      links: [],
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar without a title`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      ...fixtures.shortLinks,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar with a linked title`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      theme: 'light',
      width: 'full',
      title: {
        tag: 'h1',
        text: 'Bolt Design System',
        url: 'https://www.boltdesignsystem.com',
        icon: {
          name: 'bolt-logo-colored',
        },
      },
      ...fixtures.longLinks,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar centered with 4 short links`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      theme: 'xdark',
      width: 'auto',
      center: true,
      title: {
        tag: 'h1',
        text:
          'Bolt<span class="u-bolt-hidden u-bolt-inline@xlarge"> Design System</span></span>',
        url: '/',
        icon: {
          name: 'bolt-logo-colored',
        },
      },
      ...fixtures.shortLinks,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar variable width`, async () => {
    const results = await renderString(`
    {% grid "o-bolt-grid--center" %}
      {% cell "u-bolt-width-2/3 u-bolt-width-1/2@small" %}
        {% include "@bolt-components-navbar/navbar.twig" with {
          width: 'auto',
          center: true,
          links: [
            {
              text: 'Components',
              url: '/pattern-lab/index.html',
            },
            {
              text: 'Docs',
              url: '/docs/getting-started/index.html',
            },
            {
              text: 'Releases',
              url: 'https://github.com/bolt-design-system/bolt/releases',
              attributes: {
                target: '_blank',
              },
            },
            {
              text: 'Github',
              url: 'https://github.com/bolt-design-system/bolt',
              attributes: {
                target: '_blank',
              },
              icon: {
                name: 'github',
                position: 'after',
              },
            },
          ],
        } only %}
      {% endcell %}
    {% endgrid %}
  `);

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
