/* eslint-disable no-await-in-loop */
import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';
import { join } from 'path';

async function renderTwig(template, data) {
  return await render(template, data, true);
}

const timeout = 60000;

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
    width: 896,
    height: 414,
  },
  {
    size: 'small',
    width: 320,
    height: 568,
  },
];

describe('<bolt-navbar> Component', async () => {
  let page;

  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });
  }, timeout);

  test('<bolt-navbar> with 6 lengthy links', async () => {
    const { html, ok } = await renderTwig(
      '@bolt-components-navbar/navbar.twig',
      {
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
      },
    );
    expect(ok).toBe(true);
    expect(html).toMatchSnapshot();

    await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
    }, html);

    const screenshots = [];

    async function isVisible(selector) {
      return await page.evaluate(selector => {
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

    async function processViewportSizes(viewportSizes) {
      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot();

        if (await isVisible('.c-bolt-nav-priority__show-more')) {
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
          screenshots[size].navOpened = await page.screenshot();
          expect(screenshots[size].navOpened).toMatchImageSnapshot();
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
        }
      }
    }

    await processViewportSizes(viewportSizes);
  }, 10000);

  test('<bolt-navbar> with a linked title', async () => {
    const { html, ok } = await renderTwig(
      '@bolt-components-navbar/navbar.twig',
      {
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
      },
    );
    expect(ok).toBe(true);
    expect(html).toMatchSnapshot();

    await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
    }, html);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

    await page.tap('.c-bolt-navbar__title--link');

    const pageTitle = await page.title();
    expect(pageTitle).toMatch('Bolt Design System');

  }, 20000);

  test('<bolt-navbar> with 4 short links', async () => {
    const { html, ok } = await renderTwig(
      '@bolt-components-navbar/navbar.twig',
      {
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
      },
    );
    expect(ok).toBe(true);
    expect(html).toMatchSnapshot();

    await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
    }, html);

    const screenshots = [];

    async function isVisible(selector) {
      return await page.evaluate(selector => {
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

    async function processViewportSizes(viewportSizes) {
      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot();

        if (await isVisible('.c-bolt-nav-priority__show-more')) {
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
          screenshots[size].navOpened = await page.screenshot();
          expect(screenshots[size].navOpened).toMatchImageSnapshot();
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
        }
      }
    }

    await processViewportSizes(viewportSizes);
  }, 10000);

  test('<bolt-navbar> centered with 4 short links', async () => {
    const { html, ok } = await renderTwig(
      '@bolt-components-navbar/navbar.twig',
      {
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
      },
    );
    expect(ok).toBe(true);
    expect(html).toMatchSnapshot();

    await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
    }, html);

    const screenshots = [];

    async function isVisible(selector) {
      return await page.evaluate(selector => {
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

    async function processViewportSizes(viewportSizes) {
      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot();

        if (await isVisible('.c-bolt-nav-priority__show-more')) {
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
          screenshots[size].navOpened = await page.screenshot();
          expect(screenshots[size].navOpened).toMatchImageSnapshot();
          await page.tap('.c-bolt-nav-priority__button');
          await page.waitFor(500);
        }
      }
    }

    await processViewportSizes(viewportSizes);
  }, 10000);

  test('<bolt-navbar> without links', async () => {
    const { html, ok } = await renderTwig(
      '@bolt-components-navbar/navbar.twig',
      {
        title: {
          tag: 'h2',
          text: 'Navbar without links',
          icon: {
            name: 'marketing-gray',
          },
        },
        links: [],
      },
    );
    expect(ok).toBe(true);
    expect(html).toMatchSnapshot();

    await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
    }, html);
    const largeViewport = await page.screenshot();

    expect(largeViewport).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    await page.setViewport({ height: 568, width: 320 });
    const smallViewport = await page.screenshot();

    expect(smallViewport).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  // test('Default <bolt-ratio> w/o Shadow DOM renders', async function() {
  //   const renderedRatioHTML = await page.evaluate(() => {
  //     const ratio = document.createElement('bolt-ratio');
  //     const img = document.createElement('img');
  //     img.setAttribute('src', '/fixtures/1200x660.jpg');

  //     ratio.setAttribute('no-shadow', '');
  //     ratio.setAttribute('ratio', '1200/660');
  //     ratio.appendChild(img);

  //     document.body.appendChild(ratio);
  //     return ratio.outerHTML;
  //   });
  //   expect(renderedRatioHTML).toMatchSnapshot();

  //   const image = await page.screenshot();
  //   expect(image).toMatchImageSnapshot({
  //     failureThreshold: '0.01',
  //     failureThresholdType: 'percent',
  //   });

  //   const renderedRatioStyles = await page.evaluate(() => {
  //     const ratio = document.querySelector('bolt-ratio');
  //     const innerRatio = ratio.renderRoot.querySelector('.c-bolt-ratio');
  //     return innerRatio.style.getPropertyValue('--aspect-ratio').trim();
  //   });

  //   expect(renderedRatioStyles).toMatch(parseFloat(1200 / 660).toFixed(5));
  // });

  // test('<bolt-ratio> with HTML5 video renders', async function() {
  //   const renderedRatioHTML = await page.evaluate(() => {
  //     const ratio = document.createElement('bolt-ratio');

  //     ratio.innerHTML = `<video controls poster="/fixtures/poster.png">
  //       <source src="/fixtures/devstories.webm" type="video/webm;codecs=&quot;vp8, vorbis&quot;">
  //       <source src="/fixtures/devstories.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
  //       <track src="/fixtures/devstories-en.vtt" label="English subtitles" kind="subtitles" srclang="en" default="">
  //     </video>`;
  //     ratio.setAttribute('ratio', '640/360');
  //     ratio.style.width = '640px';
  //     document.body.appendChild(ratio);
  //     return ratio.outerHTML;
  //   });

  //   const renderedRatioSize = await page.evaluate(() => {
  //     const ratioSize = {
  //       width: document.querySelector('bolt-ratio').clientWidth,
  //       height: document.querySelector('bolt-ratio').clientHeight,
  //     };
  //     return ratioSize;
  //   });

  //   const image = await page.screenshot();

  //   expect(image).toMatchImageSnapshot({
  //     failureThreshold: '0.01',
  //     failureThresholdType: 'percent',
  //   });

  //   expect(renderedRatioHTML).toMatchSnapshot();
  // });
});
