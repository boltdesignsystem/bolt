/* eslint-disable no-await-in-loop */
import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';

const imageVrtConfig = {
  failureThreshold: '0.02',
  failureThresholdType: 'percent',
};

const timeout = 120000;

const viewportSizes = [
  {
    size: 'xlarge',
    width: 1920,
    height: 1080,
  },
  {
    size: 'large',
    width: 1024,
    height: 768,
  },
  {
    size: 'medium',
    width: 800,
    height: 414,
  },
  {
    size: 'small',
    width: 320,
    height: 568,
  },
];

describe('<bolt-navbar> Component', () => {
  let page, isOnline;

  beforeAll(async () => {
    isOnline = await isConnected();
  });

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

  afterEach(async () => {
    await page.close();
  });

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  }, timeout);

  test(
    '<bolt-navbar> with 6 lengthy links',
    async () => {
      const { html, ok } = await render('@bolt-components-navbar/navbar.twig', {
        title: {
          tag: 'h2',
          text: 'Navbar with links',
          icon: {
            name: 'marketing-gray',
          },
        },
        links: [
          {
            text: 'Real-Time AI',
            url: '#!',
          },
          {
            text: 'End-to-end Automation',
            url: '#!',
          },
          {
            text: 'Journey-centric Delivery',
            url: '#!',
          },
          {
            text: 'Low Code',
            url: '#!',
          },
          {
            text: 'Multi-dimensional Power',
            url: '#!',
          },
          {
            text: 'Cloud Choice',
            url: '#!',
          },
        ],
      });
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate((html) => {
        const div = document.createElement('div');
        div.innerHTML = `${html}`;
        document.body.appendChild(div);
      }, html);

      const screenshots = [];

      async function isVisible(selector) {
        return await page.evaluate((selector) => {
          const e = document.querySelector(selector);
          if (!e) return false;
          const style = window.getComputedStyle(e);
          return style &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
            ? true
            : false;
        }, selector);
      }

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);

        if (await isVisible('.c-bolt-nav-priority__show-more')) {
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
          screenshots[size].navOpened = await page.screenshot();
          expect(screenshots[size].navOpened).toMatchImageSnapshot(
            imageVrtConfig,
          );
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
        }
      }
    },
    timeout,
  );

  test(
    '<bolt-navbar> with a linked title',
    async () => {
      const { html, ok } = await render('@bolt-components-navbar/navbar.twig', {
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
        links: [
          {
            text: 'Real-Time AI',
            url: '#!',
          },
          {
            text: 'End-to-end Automation',
            url: '#!',
          },
          {
            text: 'Journey-centric Delivery',
            url: '#!',
          },
          {
            text: 'Low Code',
            url: '#!',
          },
          {
            text: 'Multi-dimensional Power',
            url: '#!',
          },
          {
            text: 'Cloud Choice',
            url: '#!',
          },
        ],
      });
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate((html) => {
        const div = document.createElement('div');
        div.innerHTML = `${html}`;
        document.body.appendChild(div);
      }, html);

      const navigationPromise = page.waitForNavigation();
      await page.hover('.c-bolt-navbar__title--link');

      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot(imageVrtConfig);

      if (isOnline) {
        await page.click('.c-bolt-navbar__title--link');
        await navigationPromise; // wait for page navigation to finish before verifying the navbar link rendered + brought us to the main docs site

        const pageTitle = await page.title();
        expect(pageTitle).toMatch('Bolt Design System');
      }
    },
    timeout,
  );

  test(
    '<bolt-navbar> with 4 short links',
    async () => {
      const { html, ok } = await render('@bolt-components-navbar/navbar.twig', {
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
      });
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate((html) => {
        const div = document.createElement('div');
        div.innerHTML = `${html}`;
        document.body.appendChild(div);
      }, html);

      const screenshots = [];

      async function isVisible(selector) {
        return await page.evaluate((selector) => {
          const e = document.querySelector(selector);
          if (!e) return false;
          const style = window.getComputedStyle(e);
          return style &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
            ? true
            : false;
        }, selector);
      }

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);

        if (await isVisible('.c-bolt-nav-priority__show-more')) {
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
          screenshots[size].navOpened = await page.screenshot();
          expect(screenshots[size].navOpened).toMatchImageSnapshot(
            imageVrtConfig,
          );
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
        }
      }
    },
    timeout,
  );

  test(
    '<bolt-navbar> centered with 4 short links',
    async () => {
      const { html, ok } = await render('@bolt-components-navbar/navbar.twig', {
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
      });
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate((html) => {
        const div = document.createElement('div');
        div.innerHTML = `${html}`;
        document.body.appendChild(div);
      }, html);

      const screenshots = [];

      async function isVisible(selector) {
        return await page.evaluate((selector) => {
          const e = document.querySelector(selector);
          if (!e) return false;
          const style = window.getComputedStyle(e);
          return style &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
            ? true
            : false;
        }, selector);
      }

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);

        if (await isVisible('.c-bolt-nav-priority__show-more')) {
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
          screenshots[size].navOpened = await page.screenshot();
          expect(screenshots[size].navOpened).toMatchImageSnapshot(
            imageVrtConfig,
          );
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
        }
      }
    },
    timeout,
  );

  test(
    '<bolt-navbar> without links',
    async () => {
      const { html, ok } = await render('@bolt-components-navbar/navbar.twig', {
        title: {
          tag: 'h2',
          text: 'Navbar without links',
          icon: {
            name: 'marketing-gray',
          },
        },
        links: [],
      });
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate((html) => {
        const div = document.createElement('div');
        div.innerHTML = `${html}`;
        document.body.appendChild(div);
      }, html);
      const largeViewport = await page.screenshot();

      expect(largeViewport).toMatchImageSnapshot(imageVrtConfig);

      await page.setViewport({ height: 568, width: 320 });
      const smallViewport = await page.screenshot();

      expect(smallViewport).toMatchImageSnapshot(imageVrtConfig);
    },
    timeout,
  );

  test(
    '<bolt-navbar> without a title',
    async () => {
      const { html, ok } = await render('@bolt-components-navbar/navbar.twig', {
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
      });
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate((html) => {
        const div = document.createElement('div');
        div.innerHTML = `${html}`;
        document.body.appendChild(div);
      }, html);
      const largeViewport = await page.screenshot();

      expect(largeViewport).toMatchImageSnapshot(imageVrtConfig);

      await page.setViewport({ height: 568, width: 320 });
      const smallViewport = await page.screenshot();

      expect(smallViewport).toMatchImageSnapshot(imageVrtConfig);
    },
    timeout,
  );

  test(
    '<bolt-navbar> variable width',
    async () => {
      const { html, ok } = await renderString(`
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
      expect(ok).toBe(true);
      expect(html).toMatchSnapshot();

      await page.evaluate((html) => {
        const div = document.createElement('div');
        div.innerHTML = `${html}`;
        document.body.appendChild(div);
      }, html);

      const screenshots = [];

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);
      }
    },
    timeout,
  );
});
