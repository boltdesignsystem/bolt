import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../table-basic.schema';
const {
  format,
  borderless,
  // eslint-disable-next-line camelcase
  fixed_width_table,
  // eslint-disable-next-line camelcase
  fixed_width_columns,
} = schema.properties;
let page, fixtures;

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

  const defaultData = {
    rows: [
      {
        cells: ['R1C1', 'R1C2', 'R1C3'],
      },
      {
        cells: ['R2C1', 'R2C2', 'R2C3'],
      },
      {
        cells: ['R3C1', 'R3C2', 'R3C3'],
      },
    ],
  };

  const headerData = {
    headers: {
      top: {
        cells: ['Column 1', 'Column 2', 'Column 3'],
      },
    },
  };

  const sideHeaderData = {
    headers: {
      side: {
        cells: ['Row 1', 'Row 2', 'Row 3', 'Footer'],
      },
    },
  };

  const footerData = {
    footer: {
      cells: ['FC1', 'FC2', 'FC3'],
    },
  };

  fixtures = {
    defaultData,
    headerData,
    sideHeaderData,
    footerData,
  };
});

describe('Bolt Table Basic', () => {
  test(`default`, async () => {
    const results = await render(
      '@bolt-components-table-basic/table-basic.twig',
      {
        ...fixtures.defaultData,
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Table Basic Component Prop -', () => {
  // // Target each of the schema keys with the following pattern
  format.enum.forEach(async option => {
    test(`format items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-table-basic/table-basic.twig',
        {
          ...fixtures.defaultData,
          format: option,
        },
      );
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  test(`borderless: true`, async () => {
    const results = await render(
      '@bolt-components-table-basic/table-basic.twig',
      {
        ...fixtures.defaultData,
        borderless: true,
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`fixed_width_table: true`, async () => {
    const results = await render(
      '@bolt-components-table-basic/table-basic.twig',
      {
        ...fixtures.defaultData,
        fixed_width_table: true,
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  fixed_width_columns.enum.forEach(async option => {
    test(`fixed_width_columns items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-table-basic/table-basic.twig',
        {
          ...fixtures.defaultData,
          fixed_width_columns: option,
        },
      );
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
