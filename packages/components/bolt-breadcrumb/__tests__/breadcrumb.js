import { render, renderString } from '@bolt/twig-renderer';

let resultsAria, resultsAttributes, resultsContentItems, linkOne, linkTwo;

beforeAll(async () => {
  linkOne = await render('@bolt-components-link/link.twig', {
    text: 'Home',
    url: '#!',
  });
  linkTwo = await render('@bolt-components-link/link.twig', {
    text: 'Other Page',
    url: '#!',
  });
});

beforeEach(async () => {
  resultsAttributes = await render(
    '@bolt-components-breadcrumb/breadcrumb.twig',
    {
      contentItems: [linkOne.html, linkTwo.html],
      attributes: {
        'data-foobar': 'baz',
        'aria-role': 'list',
      },
    },
  );

  resultsContentItems = await renderString(`
    {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
      contentItems: [
        include("@bolt-components-link/link.twig", {
          text: "Home",
          url: "#!"
        }),
        include("@bolt-components-link/link.twig", {
          text: "Landing Page",
          url: "#!"
        }),
        include("@bolt-components-link/link.twig", {
          text: "Sub Page",
          url: "#!"
        }),
        "Current Page"
      ]
    } only %}
    `);

  resultsAria = await renderString(`
    {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
      contentItems: [
        include("@bolt-components-link/link.twig", {
          text: "Home",
          url: "#!"
        }),
        include("@bolt-components-link/link.twig", {
          text: "Landing Page",
          url: "#!"
        }),
        include("@bolt-components-link/link.twig", {
          text: "Sub Page",
          url: "#!"
        }),
        include("@bolt-components-link/link.twig", {
          text: "Current Page",
          url: "#!",
          attributes: {
            "aria-current": true
          },
        }),
      ]
    } only %}
  `);
});

describe('<bolt-breadcrumb> Component', () => {
  test('basic usage with attributes', async () => {
    await expect(resultsAttributes.ok).toBe(true);
    await expect(resultsAttributes.html).toMatchSnapshot();
  });

  test('basic usage with contentItems including rendered components and strings', async () => {
    await expect(resultsContentItems.ok).toBe(true);
    await expect(resultsContentItems.html).toMatchSnapshot();
  });

  test('current page aria variation', async () => {
    await expect(resultsAria.ok).toBe(true);
    await expect(resultsAria.html).toMatchSnapshot();
  });
});
