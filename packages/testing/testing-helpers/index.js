export { isConnected } from './is-connected';
import {
  render as renderServer,
  renderString as renderStringServer,
  stop as stopServer,
} from '@bolt/twig-renderer';
export { fixture as html } from '@open-wc/testing-helpers';

export async function render(template, data) {
  return await renderServer(template, data, true);
}

export async function renderString(template, data) {
  return await renderStringServer(template, data, false);
}

export { stopServer };

// import {
//   // isConnected,
//   // render,
//   // renderString,
//   // stopServer,
//   html,
// } from '../../../testing-helpers';
