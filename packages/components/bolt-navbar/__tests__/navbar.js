import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../navbar.schema';
const { spacing, theme } = schema.properties;
let page, fixtures;

// @TODO:
// - add test for viewports, reference git history.
//   - we should be testing the hide title here.
//   - we want to be testing the show-more menu.

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

  const itemData = [
    {
      link: {
        content: 'Section 1',
        attributes: {
          href: '#section-1',
        },
      },
    },
    {
      link: {
        content: 'Section 2',
        attributes: {
          href: '#section-2',
        },
      },
    },
    {
      link: {
        content: 'Section 3',
        attributes: {
          href: '#section-3',
        },
      },
    },
  ];

  const itemArray = [];

  await Promise.all(
    itemData.map(item =>
      render('@bolt-components-navbar/navbar-li.twig', item),
    ),
  ).then(results => {
    results.forEach(({ ok, html }) => {
      if (ok) {
        itemArray.push(html);
      }
    });
  });

  const navbarList = await render('@bolt-components-navbar/navbar-ul.twig', {
    content: itemArray.join(''),
  });

  const navbarTitle = {
    content: 'Bolt Design System',
  };

  fixtures = {
    navbarList,
    navbarTitle,
  };
});

describe('Twig Usage', () => {
  test(`Navbar default`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      title: fixtures.navbarTitle,
      links: fixtures.navbarList.html,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar without links`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      title: fixtures.navbarTitle,
    });
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar without a title`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      links: fixtures.navbarList.html,
    });
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Navbar Props', () => {
  test(`Navbar with a linked title and icon`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      title: {
        content: 'This is the navbar title',
        icon: {
          name: 'marketing-gray',
        },
        link: {
          attributes: {
            href: 'https://pega.com',
          },
        },
      },
      links: fixtures.navbarList.html,
    });
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  spacing.enum.forEach(async option => {
    test(`Navbar spacing`, async () => {
      const results = await render('@bolt-components-navbar/navbar.twig', {
        title: fixtures.navbarTitle,
        links: fixtures.navbarList.html,
        spacing: option,
      });
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  test(`Navbar centered`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      title: fixtures.navbarTitle,
      links: fixtures.navbarList.html,
      center: true,
    });
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Navbar width`, async () => {
    const results = await render('@bolt-components-navbar/navbar.twig', {
      title: fixtures.navbarTitle,
      links: fixtures.navbarList.html,
      width: 'auto',
    });
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  theme.enum.forEach(async option => {
    test(`Navbar theme`, async () => {
      const results = await render('@bolt-components-navbar/navbar.twig', {
        title: fixtures.navbarTitle,
        links: fixtures.navbarList.html,
        theme: option,
      });
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
