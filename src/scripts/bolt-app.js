import '@bolt/components-image/src/image.js';
import '@bolt/components-device-viewer';
import '@bolt/components-icon/src/icon.js'; //Required - otherwise the `dist` version would get included by default which would result in double shimming. @TODO: abstract web components polyfills into separate require.ensure call
// import '@bolt/components-card/src/card.js';
