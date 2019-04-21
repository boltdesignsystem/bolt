import './components/modal-styleguide';
import './components/pl-search/pl-search.iframe-helper';
import './utils/share-inner-iframe-data';
import 'iframe-resizer/js/iframeResizer.contentWindow.min.js';

import { targetOrigin } from './utils';

document.addEventListener('click', function(){
  const path = window.location.toString();
  const parts = path.split('?');
  const options = { 
    event: 'patternLab.pageClick',
    path: parts[0],
    details: {
      patternData: window.patternData
    }
  };

  window.parent.postMessage(options, targetOrigin);
});