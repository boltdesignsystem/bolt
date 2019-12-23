import { render, renderString } from '@bolt/twig-renderer';

describe('<bolt-breadcrumb> Component', () => {
  test('basic usage with attributes', async () => {
    const linkOne = await render('@bolt-components-link/link.twig', {
      text: 'Home',
      url: '#!',
    });
    const linkTwo = await render('@bolt-components-link/link.twig', {
      text: 'Other Page',
      url: '#!',
    });
    const results = await render(
      '@bolt-components-breadcrumb/breadcrumb.twig',
      {
        contentItems: [linkOne.html, linkTwo.html],
        attributes: {
          'data-foobar': 'baz',
          'aria-role': 'list',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with contentItems including rendered components and strings', async () => {
    const results = await renderString(`
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
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('current page aria variation', async () => {
    const results = await renderString(`
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
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
