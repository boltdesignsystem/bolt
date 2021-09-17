// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../code-snippet.schema';
import { languages } from '../src/_code-snippet-languages';

const { lang, mode } = schema.properties;
let page, fixtures;

afterAll(async () => {
  await stopServer();
  await page.close();
});

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

  const cssCode = `
    .my-css {
      display: block;
    }
  `;

  const jsCode = `import { props } from '@bolt/core-v3.x/utils';`;

  const twigCode = `
    {% include '@bolt-components-code-snippet/code-snippet.twig' with {
      lang: 'html',
      content: '<p>Hello world!</p>'
    } only %}
  `;

  const defaultData = {
    content: cssCode,
    lang: 'css',
  };

  const jsData = {
    content: jsCode,
    lang: 'js',
  };

  const twigData = {
    content: twigCode,
    lang: 'twig',
  };

  fixtures = {
    defaultData,
    jsData,
    twigData,
  };
});

describe('Bolt Code Snippet', () => {
  test('default', async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        ...fixtures.defaultData,
      },
    );

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
  test('default with JS code', async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        ...fixtures.jsData,
      },
    );

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
  test('default with Twig code', async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        ...fixtures.twigData,
      },
    );

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Code Snippet Props', () => {
  // Target each of the schema keys with the following pattern
  mode.enum.forEach(async option => {
    test(`mode: ${option}`, async () => {
      const results = await render(
        '@bolt-components-code-snippet/code-snippet.twig',
        {
          ...fixtures.defaultData,
          mode: option,
        },
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  lang.enum.forEach(async option => {
    test(`lang: ${option}`, async () => {
      // Tests that every lang option has a corresponding label in the languages file
      const label = languages[option];
      await expect(label).toMatchSnapshot();
    });
  });

  test(`hide_lang_label`, async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        ...fixtures.defaultData,
        hide_lang_label: true,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`hide_copy`, async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        ...fixtures.defaultData,
        hide_copy: true,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`hide_lang_label and hide_copy`, async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        ...fixtures.defaultData,
        hide_lang_label: true,
        hide_copy: true,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`custom_lang_label`, async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        ...fixtures.defaultData,
        custom_lang_label: 'Foo',
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
