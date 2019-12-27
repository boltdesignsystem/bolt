import { stopServer, html } from '../../testing/testing-helpers';

const timeout = 120000;

describe('Micro journeys', () => {
  let page;

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

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, timeout);

  test('<bolt-interactive-pathway> ready event emits only when actually ready', async function() {
    await page.evaluate(async () => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <bolt-interactive-pathways>
          <bolt-interactive-pathway pathway-title="My pathway title">
            <bolt-interactive-step tab-title="My step title">Hello world</bolt-interactive-step>
          </bolt-interactive-pathway>
        </bolt-interactive-pathways>
      `;
      document.body.appendChild(wrapper);

      const interactivePathway = document.querySelector(
        'bolt-interactive-pathway',
      );

      return new Promise((resolve, reject) => {
        interactivePathway.addEventListener('ready', e => {
          // Make sure that this is the ready event on interactivePathway and not a child element.
          if (interactivePathway === e.target) {
            resolve();
          }
        });
        interactivePathway.addEventListener('error', reject);
      });
    });

    const interactivePathwayShadowRoot = await page.evaluate(async () => {
      return document.querySelector('bolt-interactive-pathway').renderRoot
        .innerHTML;
    });

    expect(interactivePathwayShadowRoot).toContain('My step title');
  });
});
