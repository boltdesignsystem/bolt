import { render, stopServer, renderWC } from '../../../testing/testing-helpers';
const componentSelector = 'bolt-breadcrumb';
let page, fixtures;

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  await page.setViewport({ width: 600, height: 200 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const linkOne = await render('@bolt-components-link/link.twig', {
    text: 'Home',
    url: '#!',
  });

  const linkTwo = await render('@bolt-components-link/link.twig', {
    text: 'Other Page',
    url: '#!',
  });

  const linkThree = await render('@bolt-components-link/link.twig', {
    text: 'Sub Page',
    url: '#!',
  });

  fixtures = {
    linkOne,
    linkTwo,
    linkThree,
  };
});

afterAll(async () => {
  await stopServer();
  await page.close();
});

describe('Bolt Breadcrumb', () => {
  test('default', async () => {
    //console.log(fixtures.linkOne);
    const results = await render(
      '@bolt-components-breadcrumb/breadcrumb.twig',
      {
        contentItems: [
          fixtures.linkOne.html,
          fixtures.linkTwo.html,
          fixtures.linkThree.html,
        ],
      },
    );

    console.log(componentSelector);
    console.log(results.html);
    console.log(page);

    const { innerHTML, outerHTML } = await renderWC(
      componentSelector,
      results.html,
      page,
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
    await expect(innerHTML).toMatchSnapshot();
    await expect(outerHTML).toMatchSnapshot();
  });

  // test('basic usage with contentItems including rendered components and strings', async () => {
  //   const linkFour = await render('@bolt-components-link/link.twig', {
  //     text: 'Sub Page',
  //     url: '#!',
  //     attributes: {
  //       "aria-current": true
  //     },
  //   });
  // });
});

// describe('<bolt-breadcrumb> Component', () => {
//   test('basic usage with attributes', async () => {
//     const linkOne = await render('@bolt-components-link/link.twig', {
//       text: 'Home',
//       url: '#!',
//     });
//     const linkTwo = await render('@bolt-components-link/link.twig', {
//       text: 'Other Page',
//       url: '#!',
//     });
//     const results = await render(
//       '@bolt-components-breadcrumb/breadcrumb.twig',
//       {
//         contentItems: [linkOne.html, linkTwo.html],
//         attributes: {
//           'data-foobar': 'baz',
//           'aria-role': 'list',
//         },
//       },
//     );
//     expect(results.ok).toBe(true);
//     expect(results.html).toMatchSnapshot();
//   });

//   test('basic usage with contentItems including rendered components and strings', async () => {
//     const results = await renderString(`
// {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
//   contentItems: [
//     include("@bolt-components-link/link.twig", {
//       text: "Home",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Landing Page",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Sub Page",
//       url: "#!"
//     }),
//     "Current Page"
//   ]
// } only %}
//     `);
//     expect(results.ok).toBe(true);
//     expect(results.html).toMatchSnapshot();
//   });

//   test('current page aria variation', async () => {
//     const results = await renderString(`
// {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
//   contentItems: [
//     include("@bolt-components-link/link.twig", {
//       text: "Home",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Landing Page",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Sub Page",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Current Page",
//       url: "#!",
//       attributes: {
//         "aria-current": true
//       },
//     }),
//   ]
// } only %}
//     `);
//     expect(results.ok).toBe(true);
//     expect(results.html).toMatchSnapshot();
//   });
// });

// {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
//   contentItems: [
//     include("@bolt-components-link/link.twig", {
//       text: "Home",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Landing Page",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Sub Page",
//       url: "#!"
//     }),
//     "Current Page"
//   ]
// } only %}

// {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
//   contentItems: [
//     include("@bolt-components-link/link.twig", {
//       text: "Home",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Landing Page",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Sub Page",
//       url: "#!"
//     }),
//     include("@bolt-components-link/link.twig", {
//       text: "Current Page",
//       url: "#!",
//       attributes: {
//         "aria-current": true
//       },
//     }),
//   ]
// } only %}
