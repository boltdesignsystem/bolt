import { targetOrigin } from '../../utils';

document.addEventListener('click', function(){
  if (window.self !== window.top) {
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
  }
});
