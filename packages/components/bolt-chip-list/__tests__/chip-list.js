import { render, stopServer, html } from '../../../testing/testing-helpers';
const timeout = 90000;

describe('<bolt-chip-list> Component', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  }, timeout);

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  }, timeout);

  test('basic usage without links', async () => {
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
      items: [
        {
          text: 'Chip text 1',
        },
        {
          text: 'Chip text 2',
        },
        {
          text: 'Chip text 3',
        },
        {
          text: 'Chip text 4',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with links', async () => {
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
      items: [
        {
          text: 'Chip link 1',
          url: '#!',
        },
        {
          text: 'Chip link 2',
          url: '#!',
        },
        {
          text: 'Chip link 3',
          url: '#!',
        },
        {
          text: 'Chip link 4',
          url: '#!',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with mixed behavior', async () => {
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
      items: [
        {
          text: 'Chip link 1',
          url: '#!',
        },
        {
          text: 'Chip text 1',
        },
        {
          text: 'Chip link 3',
          url: '#!',
        },
        {
          text: 'Chip text 2',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('truncate', async () => {
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
      truncate: 3,
      items: [
        {
          text: 'Chip link 1',
          url: '#!',
        },
        {
          text: 'Chip link 2',
          url: '#!',
        },
        {
          text: 'Chip link 3',
          url: '#!',
        },
        {
          text: 'Chip link 4',
          url: '#!',
        },
        {
          text: 'Chip link 5',
          url: '#!',
        },
      ],
    });

    const twigRenderedHTML = results.html;

    const renderedComponentHTML = await page.evaluate(
      async twigRenderedHTML => {
        document.body.insertAdjacentHTML('beforeend', `${twigRenderedHTML}`);
        const el = document.querySelector('bolt-chip-list');
        await el.updateComplete;
        return el.outerHTML;
      },
      twigRenderedHTML,
    );

    const renderedHTML = await html(renderedComponentHTML);
    expect(renderedHTML).toMatchSnapshot();
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('collapsible', async () => {
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
      truncate: 3,
      collapsible: true,
      items: [
        {
          text: 'Chip link 1',
          url: '#!',
        },
        {
          text: 'Chip link 2',
          url: '#!',
        },
        {
          text: 'Chip link 3',
          url: '#!',
        },
        {
          text: 'Chip link 4',
          url: '#!',
        },
        {
          text: 'Chip link 5',
          url: '#!',
        },
      ],
    });

    const twigRenderedHTML = results.html;

    const renderedComponentHTML = await page.evaluate(
      async twigRenderedHTML => {
        document.body.insertAdjacentHTML('beforeend', `${twigRenderedHTML}`);
        const el = document.querySelector('bolt-chip-list');
        await el.updateComplete;
        return el.outerHTML;
      },
      twigRenderedHTML,
    );

    const renderedHTML = await html(renderedComponentHTML);
    expect(renderedHTML).toMatchSnapshot();
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
