export { isConnected } from './is-connected';
import { v4 as uuidv4 } from 'uuid';
import {
  render as renderServer,
  renderString as renderStringServer,
  stop as stopServer,
} from '@bolt/twig-renderer';
export { fixture as html } from '@open-wc/testing-helpers';

export { default as $RefParser } from 'json-schema-ref-parser';

export async function render(template, data) {
  return await renderServer(template, data, true);
}

export async function renderString(template, data) {
  return await renderStringServer(template, data, false);
}

export { stopServer };

/**
 * Takes the web component markup passed in, waits for it to render, then returns back the rendered inner and outer HTML
 * @param {*} componentTag - the web component HTML tag being rendered
 * @param {String} html - the actual HTML being rendered
 * @param {*} page - puppeteer page instance to render within
 * @param {Array} extraSelectors - extra web component selectors to wait to finish rendering before returning
 */
export async function renderWC(componentTag, html, page) {
  const uuid = uuidv4();
  return await page.evaluate(
    async (htmlResults, componentTag, uuid) => {
      const uuidSelector = `js-${uuid}`;
      document.body.insertAdjacentHTML(
        'beforeend',
        `<span class="${uuidSelector}">${htmlResults}</span>`,
      );
      const undefinedElements = document.querySelectorAll(
        `${componentTag}, ssr-keep`,
      );
      const promises = [...undefinedElements].map(
        elem =>
          // Here in the Jest `page` context, `customElements` and `whenDefined` do not exist.
          // It's not a complete DOM. We must set a timer and wait for component to be ready, then return.
          new Promise((resolve, reject) => {
            const interval = setInterval(() => {
              // Consider component loaded once this is true
              if (typeof elem.firstUpdated === 'function') {
                resolve();
                clearInterval(interval);
              }
            });
            setTimeout(() => {
              // bail after 5 seconds
              resolve();
            }, 5000);
          }),
      );

      await Promise.all(promises);

      const component = document.querySelector(
        `.${uuidSelector} ${componentTag}`,
      );

      return {
        innerHTML: component.renderRoot.innerHTML,
        outerHTML: component.outerHTML,
      };
    },
    html,
    componentTag,
    uuid,
  );
}

export async function basicTest(html) {
  expect(html.ok).toBe(true);
  expect(html.html).toMatchSnapshot();
}

export function basicPropTest(innerHTML, selector, prop, option) {
  // const htmlOutput = page.evaluate(
  //   async (option, innerHTML) => {
  console.log('inside htmlOutput');
  // console.log(selector);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = innerHTML;
  document.body.appendChild(wrapper);
  customElements.whenDefined('ssr-keep');
  customElements.whenDefined(selector);
  const wc = document.querySelector(selector);
  wc.setAttribute(prop, option);
  // // @TODO This should work, but throws mysterious error: `TypeError: Cannot read property 'forEach' of undefined`
  // // await tabs.updateComplete;
  return wc.outerHTML;
  //   },
  //   option,
  //   innerHTML,
  // );
  // return
  // const renderedHTML = html(htmlOutput);
  // expect(renderedHTML).toMatchSnapshot();
}
