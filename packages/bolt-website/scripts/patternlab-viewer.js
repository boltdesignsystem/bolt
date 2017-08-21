// require('data-saver');
// require('wolfy87-eventemitter');
import EventEmitter from 'wolfy87-eventemitter';
window.Dispatcher = new EventEmitter();

require('modules/toggle-navbar');
require('modules/typeahead');
require('modules/layout');
require('modules/modal-viewer');
require('modules/panels');
require('modules/panels-util');
require('modules/panels-viewer');
require('modules/pattern-finder');
require('modules/plugin-loader');
// // require('postmessage');
// require('prism/prism-languages');
require('modules/styleguide');
// require('url-handler');
