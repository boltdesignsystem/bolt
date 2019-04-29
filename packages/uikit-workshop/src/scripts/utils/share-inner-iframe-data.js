import { targetOrigin } from '../utils';

// alert the iframe parent that the pattern has loaded assuming this view was loaded in an iframe
if (window.self !== window.top) {
  // handle the options that could be sent to the parent window
  //   - all get path
  //   - pattern & view all get a pattern partial, styleguide gets all
  //   - pattern shares lineage
  const path = window.location.toString();
  const parts = path.split('?');
  const options = { 
    event: 'patternLab.pageLoad',
    path: parts[0],
    details: {
      patternData: window.patternData
    }
  };

  // window.patternData = document.getElementById(
  //   'pl-pattern-data-footer'
  // ).innerHTML;
  // window.patternData = JSON.parse(window.patternData);
  options.patternpartial =
    window.patternData.patternPartial !== undefined
      ? window.patternData.patternPartial
      : 'all';
  if (window.patternData.lineage !== '') {
    options.lineage = window.patternData.lineage;
  }

  window.parent.postMessage(options, targetOrigin);
}