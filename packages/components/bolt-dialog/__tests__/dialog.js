// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../dialog.schema';
const { width, spacing, persistent, theme } = schema.properties;
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

  const dialogHeader = await render(
    '@bolt-components-dialog/dialog-header.twig',
    { content: 'Header content' },
  );
  const dialogBody = await render('@bolt-components-dialog/dialog-body.twig', {
    content: 'Body content',
  });
  const dialogFooter = await render(
    '@bolt-components-dialog/dialog-footer.twig',
    { content: 'Footer content' },
  );

  const defaultData = {
    content: [dialogHeader.html, dialogBody.html, dialogFooter.html].join(''),
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Dialog component', () => {
  test('default', async () => {
    const results = await render('@bolt-components-dialog/dialog.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  width.enum.forEach(async option => {
    test(`dialog width: ${option}`, async () => {
      const results = await render('@bolt-components-dialog/dialog.twig', {
        ...fixtures.defaultData,
        width: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async option => {
    test(`dialog spacing: ${option}`, async () => {
      const results = await render('@bolt-components-dialog/dialog.twig', {
        ...fixtures.defaultData,
        spacing: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async option => {
    test(`dialog theme: ${option}`, async () => {
      const results = await render('@bolt-components-dialog/dialog.twig', {
        ...fixtures.defaultData,
        theme: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`dialog persistent: true`, async () => {
    const results = await render('@bolt-components-dialog/dialog.twig', {
      ...fixtures.defaultData,
      persistent: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
