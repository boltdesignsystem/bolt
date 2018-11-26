import ReactDOM from 'react-dom';
import { h } from '@bolt/core/renderers';
import '@bolt/components-button';
import { getSubArray } from '../utils';

export const VideoOverlayContent = props => {
  return (
    <bolt-button color="primary" url={props.url}>
      {props.text}
    </bolt-button>
  );
};

export function cuePointsPlugin(player, elem) {
  player.on('loadstart', function() {
    // Listen for cue change then pass data to be displayed
    player.cuePointAra = player.mediainfo.cue_points;
    player.tt = player.textTracks()[0];

    // When a cue point starts, extract cue data and pass data to be displayed
    player.tt.oncuechange = function() {
      if (player.tt.activeCues[0] !== undefined) {
        player.allCuePointData = getSubArray(
          player.cuePointAra,
          'time',
          player.tt.activeCues[0].startTime,
        );

        _render(player.allCuePointData[0]);
      }
    };

    // Extract data pieces from cue point meta data and display overlay
    function _render(cpData) {
      // Split metadata into an array of three pieces based on location of semicolons
      let dataAra = cpData.metadata.split(';'),
        durationCTA = dataAra[0],
        textCTA = dataAra[1],
        urlCTA = dataAra[2],
        timeoutValue;

      // Set duration, set timeout, inject dynamic html and show overlay
      timeoutValue = Number(durationCTA) * 1000;
      elem.overlayTimeout = window.setTimeout(checkCuePointsTime, timeoutValue);

      ReactDOM.render(
        <VideoOverlayContent url={urlCTA} text={textCTA} />,
        elem.overlayElement,
      );

      if (elem.showOverlay) {
        elem.showOverlay();
      }
    }

    // Clear timeout and remove overlay
    // This function called when cue point timeout is reached
    function checkCuePointsTime() {
      window.clearTimeout(elem.overlayTimeout);

      if (elem.hideOverlay) {
        elem.hideOverlay();
      }
    }
  });
}
