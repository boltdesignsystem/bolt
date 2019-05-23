import { render } from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../blockquote.schema.yml'));
const { tag, size, alignItems, border } = schema.properties;

const timeout = 90000;

describe('<bolt-blockquote> component', () => {
  let page;

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });
  }, timeout);

  test('<bolt-blockquote> basic usage', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        author: {
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-blockquote> basic usage w/ author', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-blockquote> indent usage', async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
        indent: true,
        author: {
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  size.enum.forEach(async option => {
    test(`<bolt-blockquote> size variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          size: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  alignItems.enum.forEach(async option => {
    test(`<bolt-blockquote> align variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          alignItems: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  border.enum.forEach(async option => {
    test(`<bolt-blockquote> border variations: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          border: option,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });

    test(`<bolt-blockquote> border variations with inset: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          content:
            '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
          border: option,
          inset: true,
          author: {
            name: 'Michelangelo di Lodovico Buonarroti Simoni',
            title: 'Renaissance Artist',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`advanced <bolt-blockquote> usage`, async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        content:
          '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
        border: 'horizontal',
        inset: true,
        logo: {
          invert: true,
          src: '/fixtures/paypal.svg',
        },
        author: {
          image: {
            src: '/fixtures/author.jpg',
            lazyload: false,
          },
          name: 'Michelangelo di Lodovico Buonarroti Simoni',
          title: 'Renaissance Artist',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-blockquote> renders to Shadow DOM', async function() {
    const defaultBlockquoteOuter = await page.evaluate(() => {
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
      blockquote.innerHTML = `<img slot="logo" src="/fixtures/logo-paypal.svg" alt="PayPal Logo">
        <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
        <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
      document.body.appendChild(blockquote);
      blockquote.updated();
      return blockquote.outerHTML;
    });

    const renderedHTML = await html(defaultBlockquoteOuter);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.03',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('<bolt-blockquote> renders to Light DOM', async function() {
    const renderedBlockquoteHTML = await page.evaluate(() => {
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
      blockquote.innerHTML = `<img slot="logo" src="/fixtures/logo-paypal.svg" alt="PayPal Logo">
        <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
        <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
      document.body.appendChild(blockquote);
      blockquote.useShadow = false;
      blockquote.updated();
      return blockquote.outerHTML;
    });

    const renderedHTML = await html(renderedBlockquoteHTML);

    expect(
      renderedHTML
        .querySelector('.c-bolt-blockquote')
        .classList.contains('c-bolt-blockquote--xlarge'),
    ).toBe(true);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.03',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('<bolt-blockquote> renders when inside a <form>', async function() {
    const renderedBlockquoteHTML = await page.evaluate(() => {
      const form = document.createElement('form');
      const blockquote = document.createElement('bolt-blockquote');
      blockquote.setAttribute(
        'author-name',
        'Michelangelo di Lodovico Buonarroti Simoni',
      );
      blockquote.setAttribute('author-title', 'Renaissance Artist');
      blockquote.setAttribute('author-image', '/fixtures/500x500.jpg');
      blockquote.innerHTML = `<img slot="logo" src="/fixtures/logo-paypal.svg" alt="PayPal Logo">
        <p>The greater danger for most of us lies not in setting our aim too high and falling short...</p>
        <p>In fact, the greater danger is setting our aim too low and achieving our mark.</p>`;
      document.body.appendChild(form);
      form.appendChild(blockquote);
      blockquote.updated();
      return blockquote.innerHTML;
    });

    const renderedHTML = await html(renderedBlockquoteHTML);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.03',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });
});
