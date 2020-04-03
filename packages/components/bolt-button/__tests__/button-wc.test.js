// WIP - still working on babel transpiling needed for this!
// Inspired heavily by https://github.com/mixpanel/panel/blob/master/test/server/component.js

import '@bolt/core-v3.x/utils/testing-helpers/dom-shims';

import nextAnimationFrame from '@bolt/core-v3.x/utils/testing-helpers/next-animation-frame';
import { compactHtml } from '@bolt/core-v3.x/utils/testing-helpers/compact-html';
import { BoltButton } from '../src/button';

customElements.define(`bolt-button`, BoltButton);

describe.skip(`Server-side button component renderer`, function () {
  // WIP - need to confirm state expected
  test(`can register and create components with document.createElement`, function () {
    const el = document.createElement(`bolt-button`);
    expect(el.state).toEqual({});
    el.connectedCallback();

    console.log(el.state);
    // expect(el.state).toEqual({foo: `bar`, baz: `qux`});
  });

  // WIP - need to confirm HTML expected
  test(`renders a simple component`, async function () {
    const el = new BoltButton();
    el.connectedCallback();
    await nextAnimationFrame();
    const html = el.innerHTML;
    // console.log(html);
    // expect(html.toLowerCase()).to.contain(`<div class="foo">`);
    // expect(html).to.contain(`Value of foo: bar`);
    // expect(html).to.contain(`Foo capitalized: Bar`);
  });

  // WIP #1
  test(`button re-renders properly when a slotted icon is injected`, async function () {
    const testButton = document.querySelector('.js-button-test');
    const newIcon = document.createElement('bolt-icon');
    newIcon.setAttribute('name', 'arrow-left');
    newIcon.setAttribute('slot', 'before');
    testButton.appendChild(newIcon);
  });

  // WIP #2
  test(`button re-renders properly when a slotted icon is removed`, async function () {
    const testButton = document.querySelector('.js-button-test');
    const iconToRemove = testButton.querySelector('bolt-icon:last-child');
    testButton.removeChild(iconToRemove);
  });

  // WIP #3
  test(`button re-renders when attribute updated`, async function () {
    const testButton = document.querySelector('.js-button-test');
    testButton.setAttribute('color', 'secondary');
  });
});
