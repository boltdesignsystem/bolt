import { render } from '@bolt/twig-renderer';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../code-snippet.schema.yml'));
const { display, lang, syntax } = schema.properties;

describe('<bolt-snippet> Component', () => {
  test('basic usage', async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        display: 'block',
        lang: 'html',
        content: 'some snippet code',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with attributes', async () => {
    const results = await render(
      '@bolt-components-code-snippet/code-snippet.twig',
      {
        attributes: {
          'data-foo': 'baz',
        },
        display: 'block',
        lang: 'html',
        content: 'some snippet code',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  display.enum.forEach(async (displayChoice) => {
    test(`Snippet display: ${displayChoice}`, async () => {
      const results = await render(
        '@bolt-components-code-snippet/code-snippet.twig',
        {
          display: displayChoice,
          content: 'some snippet code',
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  lang.enum.forEach(async (langChoice) => {
    test(`Snippet language: ${langChoice}`, async () => {
      const results = await render(
        '@bolt-components-code-snippet/code-snippet.twig',
        {
          lang: langChoice,
          content: `This is ${langChoice}`,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  syntax.enum.forEach(async (syntaxChoice) => {
    test(`Snippet syntax: ${syntaxChoice}`, async () => {
      const results = await render(
        '@bolt-components-code-snippet/code-snippet.twig',
        {
          syntax: syntaxChoice,
          content: 'some snippet code',
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
