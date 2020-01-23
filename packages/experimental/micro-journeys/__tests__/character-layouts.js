import { stopServer, html } from '../../../testing/testing-helpers';
const { getDataFile } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');

const timeout = 992000;
jest.setTimeout(timeout);

describe('Character layouts', () => {
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
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  }, timeout);

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, timeout);

  test('<bolt-character> animates in and its <bolt-status-dialog-bar> is centered', async function() {
    const oneCharLorem = await getDataFile(
      join(__dirname, '../starters/one-character-lorem.html'),
    );
    // Await character rendered.
    await page.evaluate(async oneCharLorem => {
      return new Promise((resolve, reject) => {
        document.addEventListener('rendered', e => {
          if (e.target.nodeName.toLowerCase() === 'bolt-character') {
            resolve();
          }
        });
        document.addEventListener('error', reject);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = oneCharLorem;
        document.body.appendChild(wrapper);
      });
    }, oneCharLorem);

    await page.evaluate(async () => {
      const character = document.querySelector('bolt-character');
      const characterAnims = character.querySelectorAll('bolt-animate');
      return new Promise((resolve, reject) => {
        characterAnims.forEach(el => el.triggerAnimIn());
        // @TODO The proper way to do this is with triggerAnims but that would need to be added to page scripts.
        setTimeout(() => {
          resolve();
        }, 3000);
        character.addEventListener('error', reject);
      });
    });

    const rectsJSON = await page.evaluate(async () => {
      const character = document.querySelector('bolt-character');
      const dialog = character.querySelector('bolt-status-dialogue-bar');
      return JSON.stringify({
        character: character.getBoundingClientRect(),
        dialog: dialog.getBoundingClientRect(),
      });
    });

    const rects = JSON.parse(rectsJSON);
    const zeroIsCentered =
      rects.dialog.x * 2 + rects.dialog.width - rects.character.width;
    expect(zeroIsCentered < 1 && zeroIsCentered > -3).toBeTruthy();
  });
});
