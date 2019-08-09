export { isConnected } from './is-connected';
import {
  render as renderServer,
  renderString as renderStringServer,
  stop as stopServer,
} from '@bolt/twig-renderer';
export { fixture as html } from '@open-wc/testing-helpers';

export $RefParser from "json-schema-ref-parser";

export async function render(template, data) {
  return await renderServer(template, data, true);
}

export async function renderString(template, data) {
  return await renderStringServer(template, data, false);
}

export { stopServer };

export const vrtDefaultConfig = {
  failureThreshold: '0.002',
  failureThresholdType: 'percent',
  customDiffConfig: {
    // Please note the threshold set in the customDiffConfig is the per pixel sensitivity threshold. For example with a source pixel colour of #ffffff (white) and a comparison pixel colour of #fcfcfc (really light grey) if you set the threshold to 0 then it would trigger a failure on that pixel. However if you were to use say 0.5 then it wouldn't, the colour difference would need to be much more extreme to trigger a failure on that pixel, say #000000 (black)
    threshold: '0.1',
    includeAA: false, // If true, disables detecting and ignoring anti-aliased pixels. false by default.
  },
};

// import {
//   // isConnected,
//   // render,
//   // renderString,
//   // stopServer,
//   html,
// } from '../../../testing-helpers';
