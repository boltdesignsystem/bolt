import { targetOrigin, urlHandler } from '../../utils';

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


// watch the iframe source so that it can be sent back to everyone else.
function receiveIframeMessage(event) {
  // does the origin sending the message match the current host? if not dev/null the request
  if (
    window.location.protocol !== 'file:' &&
    event.origin !== window.location.protocol + '//' + window.location.host
  ) {
    return;
  }

  let path;
  let data = {};
  try {
    data = typeof event.data !== 'string' ? event.data : JSON.parse(event.data);
  } catch (e) {
    // @todo: how do we want to handle exceptions like these?
  }

  if (data.event !== undefined && data.event === 'patternLab.updatePath') {
    if (window.patternData.patternPartial !== undefined) {
      // handle patterns and the view all page
      const re = /(patterns|snapshots)\/(.*)$/;
      path =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname.replace(re, '') +
        data.path +
        '?' +
        Date.now();
      window.location.replace(path);
    } else {

      const iFramePathDefaultPath = urlHandler.getFileName('components-overview');
      console.log(iFramePathDefaultPath);
      // handle the style guide
      path =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname.replace(
          iFramePathDefaultPath,
          ''
        ) +
        data.path +
        '?' +
        Date.now();

      window.location.replace(path);
    }
  } else if (data.event !== undefined && data.event === 'patternLab.reload') {
    // reload the location if there was a message to do so
    window.location.reload();
  }
}

window.addEventListener('message', receiveIframeMessage, false);