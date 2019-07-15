import ReactDOM from 'react-dom';
import { h } from '@bolt/core/renderers';
import '@bolt/components-button';
import isEqual from 'lodash.isequal';
import { getSubArray } from '../utils';

export const VideoOverlayContent = props => {
  return (
    <bolt-button variant="primary" url={props.url} target={props.target}>
      {props.text}
    </bolt-button>
  );
};

export function cuePointsPlugin(player, elem) {
  // utility function - returns back array of cue point meta data used to render dynamic CTAs
  function parseCuePointMetaData(cuePointData) {
    return cuePointData.metadata.split(';');
  }

  /**
   * Calculates the video timestamp when a specific cue point needs to be hidden
   * @param {object} $this - The reference to the unique plugin instance
   * @param {object} currentCuePoint - The cue point being evaluated
   * @return {number} The timestamp when this specific cue point needs to be hidden
   */
  function getCuePointHideTime($this, currentCuePoint) {
    const allCuePointData = getSubArray(
      $this.cuePoints,
      'time',
      currentCuePoint.startTime,
    );

    return (
      currentCuePoint.startTime +
        Number(parseCuePointMetaData(allCuePointData[0])[0]) ||
      currentCuePoint.endTime
    );
  }

  /**
   * Checks if a particular cue point should be / can be displayed
   * @param {any} cuePoint - The cue point being evaluated
   */
  function shouldCueBeDisplayed(cuePoint) {
    const currentTime = player.currentTime();
    const startTime = cuePoint.startTime;
    const hideTime = cuePoint.hideTime;

    if (currentTime >= startTime && currentTime < hideTime) {
      return true;
    }

    return false;
  }

  /**
   * Tear down function when a cue point is being hidden from view
   * @param {object} $this - The reference to the unique plugin instance
   */
  function cleanupCuePoints($this) {
    $this.previousCTA = {};
    $this.currentCTA.isActive = false;

    if (elem.hideOverlay) {
      elem.hideOverlay();
    }
  }

  /**
   * Check to see if the current cue point CTA and the previous cue point CTA are the same before rendering if they aren't
   * @param {object} $this - The reference to the unique plugin instance
   */
  function potentiallyRenderCuePoint($this) {
    const currentCTA = $this.currentCTA; // assign the currently active CTA
    const previousCTA = $this.previousCTA;
    const hideTime = $this.currentCTA.hideTime;
    const currentTime = player.currentTime();

    // auto hide and internally clean up when the video has hit the expected end time
    if (currentTime >= hideTime) {
      cleanupCuePoints($this);
    } else if (
      isEqual(previousCTA, {}) ||
      isEqual(previousCTA, currentCTA) === false
    ) {
      $this.previousCTA = $this.currentCTA;
      $this.currentCTA.isActive = true;
      renderCuePoint($this.currentCTA);
    }
  }

  /**
   * Extract data pieces from cue point meta data and display overlay
   * @param {object} currentCta - The cue point cta being rendered
   */
  function renderCuePoint(currentCta) {
    // bail if the video player's overay element (what the CTA gets rendered into) doesn't exist
    if (!elem.overlayElement) {
      return;
    }

    // Split metadata into an array of three pieces based on location of semicolons
    let ctaProps = parseCuePointMetaData(currentCta),
      ctaText = ctaProps[1],
      ctaUrl = ctaProps[2];

    if (elem.showOverlay) {
      elem.showOverlay();
    }

    ReactDOM.render(
      <VideoOverlayContent
        url={ctaUrl}
        text={ctaText}
        onClick={elem.pause()}
        target="_blank"
      />,
      elem.overlayElement,
    );
  }

  player.on('loadstart', function() {
    if (!player.mediainfo.cue_points) {
      return;
    }

    player.tt = player.tt || [];
    player.tt[elem.state.id] = player.textTracks()[0];

    const $this = player.tt[elem.state.id]; // re-map to make it easier to grab and modify this unique plugin instance's data
    $this.cuePoints = player.mediainfo.cue_points;
    $this.previousCTA = {};
    $this.currentCTA = {};

    // auto-hide overlay when initially booting up
    if (elem.hideOverlay) {
      elem.hideOverlay();
    }

    // process through available cue point data when the video player instance is playing / the time updates
    player.on('timeupdate', function() {
      const cuePointsFound = $this.cuePoints.find(function(cuePoint) {
        if (!cuePoint.hideTime) {
          cuePoint.hideTime = getCuePointHideTime($this, cuePoint);
        }

        return shouldCueBeDisplayed(cuePoint);
      });

      if (cuePointsFound) {
        $this.currentCTA = cuePointsFound;
        potentiallyRenderCuePoint($this);
      } else {
        if ($this.currentCTA.isActive === true) {
          cleanupCuePoints($this);
        }
      }
    });
  });
}
