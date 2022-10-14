import {
  render,
  renderString,
  stopServer,
} from '../../../testing/testing-helpers';
import schema from '../table.schema';
const {
  format,
  // eslint-disable-next-line camelcase
  fixed_width_columns,
  // eslint-disable-next-line camelcase
  sticky_headers,
} = schema.properties;
let page;

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
});

describe('Bolt Table Element', () => {
  test(`default`, async () => {
    const results = await renderString(`
      {% set row1 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row2 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row3 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% include '@bolt-elements-table/table.twig' with {
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`top header table element`, async () => {
    const results = await renderString(`
      {% set header %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row1 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row2 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row3 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% include '@bolt-elements-table/table.twig' with {
        header: {
          content: header,
        },
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`side header table element`, async () => {
    const results = await renderString(`
      {% set row1 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row2 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row3 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% include '@bolt-elements-table/table.twig' with {
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`footer table element`, async () => {
    const results = await renderString(`
      {% set header %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row1 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row2 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row3 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set footer %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'Side table header.',
            header: true
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a table footer cell.',
          } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a table footer cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% include '@bolt-elements-table/table.twig' with {
        header: {
          content: header,
        },
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
        footer: {
          content: footer,
        },
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Table Element Prop -', () => {
  // // Target each of the schema keys with the following pattern
  format.enum.forEach(async option => {
    test(`format items: ${option}`, async () => {
      const results = await renderString(`
        {% set header %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row1 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row2 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row3 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set footer %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'Side table header.',
              header: true
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a table footer cell.',
            } only %}
              {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a table footer cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% include '@bolt-elements-table/table.twig' with {
          format: ${JSON.stringify(option)},
          header: {
            content: header,
          },
          body: {
            content: [
              row1,
              row2,
              row3,
            ],
          },
          footer: {
            content: footer,
          },
        } only %}
      `);
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  test(`borderless: true`, async () => {
    const results = await renderString(`
      {% set header %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row1 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row2 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row3 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% include '@bolt-elements-table/table.twig' with {
        borderless: true,
        header: {
          content: header,
        },
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`fixed_width_table: true`, async () => {
    const results = await renderString(`
      {% set header %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row1 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row2 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row3 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a side header.',
            header: true,
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% include '@bolt-elements-table/table.twig' with {
        fixed_width_table: true,
        header: {
          content: header,
        },
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  fixed_width_columns.enum.forEach(async option => {
    test(`fixed_width_columns items: ${option}`, async () => {
      const results = await renderString(`
        {% set header %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row1 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row2 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row3 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% include '@bolt-elements-table/table.twig' with {
          fixed_width_columns:${JSON.stringify(option)},
          header: {
            content: header,
          },
          body: {
            content: [
              row1,
              row2,
              row3,
            ],
          },
        } only %}
      `);
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  sticky_headers.enum.forEach(async option => {
    test(`sticky_headers items: ${option}`, async () => {
      const results = await renderString(`
        {% set header %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row1 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row2 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% set row3 %}
          {% set cells %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-elements-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-elements-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}

        {% include '@bolt-elements-table/table.twig' with {
          sticky_headers:${JSON.stringify(option)},
          header: {
            content: header,
          },
          body: {
            content: [
              row1,
              row2,
              row3,
            ],
          },
        } only %}
      `);
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  test(`caption`, async () => {
    const results = await renderString(`
      {% set row1 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row2 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% set row3 %}
        {% set cells %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-elements-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-elements-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}

      {% include '@bolt-elements-table/table.twig' with {
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
        caption: 'This is a table caption'
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
