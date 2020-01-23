import * as starters from '@bolt/micro-journeys/starters';
import { stopServer, html } from '../../../testing/testing-helpers';

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

  test('<bolt-character> animates in on <bolt-step>', async function() {
    // Await character rendered.
    await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        document.addEventListener('rendered', e => {
          if (e.target.nodeName.toLowerCase() === 'bolt-character') {
            resolve();
          }
        });
        document.addEventListener('error', reject);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = starters.oneCharacterLorem;
        document.body.appendChild(wrapper);
      });
    });

    // await page.evaluate(async () => {
    //   const wrapper = document.createElement('div');
    //   wrapper.innerHTML = starters.oneCharacterLorem;
    //   document.body.appendChild(wrapper);
    //   const animateElCount = document.querySelectorAll('bolt-animate').length;
    //   console.log('animateElCount', animateElCount);
    //   await document.addEventListener('rendered', el => {
    //     if (el.target.nodeName === 'BOLT-CHARACTER') {
    //     }
    //   });
    //   let animateEndEventCount = 0;
    //   return new Promise((resolve, reject) => {
    //     step.addEventListener('bolt-animate:end:out', e => {
    //       debugger;
    //       animateEndEventCount++;
    //       console.log('animateEndEventCount', animateEndEventCount);
    //       if (animateEndEventCount >= animateElCount) {
    //         resolve();
    //       }
    //     });
    //     debugger;
    //     step.triggerAnimIns();
    //     step.addEventListener('error', reject);
    //   });
    // });
    //
    // const stepShadowRoot = await page.evaluate(async () => {
    //   return document.querySelector('bolt-interactive-step').renderRoot
    //     .innerHTML;
    // });

    // expect(stepShadowRoot).toContain('My step title');
  });
});
