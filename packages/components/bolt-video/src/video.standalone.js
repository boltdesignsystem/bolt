import { customElement } from '@bolt/element';
import { beforeNextRender, props, css } from '@bolt/core-v3.x/utils';
import { h, withPreact } from '@bolt/core-v3.x/renderers';
import Mousetrap from 'mousetrap';
import classNames from 'classnames';

import {
  socialPlugin,
  emailPlugin,
  playbackPlugin,
  cuePointsPlugin,
} from '../plugins/index';
import { datasetToObject, formatVideoDuration } from '../utils';

let index = 0;
@customElement('bolt-video')
class BoltVideo extends withPreact {
  static props = {
    videoId: props.string,
    accountId: props.string,
    playerId: props.string,
    poster: props.object,
    isBackgroundVideo: props.boolean, // @todo: `isBackgroundVideo` will be removed with Bolt v3.0
    onInit: props.string,
    showMeta: props.boolean,
    showMetaTitle: props.boolean,
    closeButtonText: props.string,
    shareDescription: props.string,
    loop: props.boolean,
    controls: props.boolean,
    autoplay: props.boolean,
    resetOnFinish: props.boolean,
    directToFullscreen: props.boolean,
    hideFullScreenButton: props.boolean,
    overlayAlignment: {
      ...props.string,
      ...{ default: 'bottom' },
    },
    enabledPlugins: {
      ...props.string,
      ...{ default: 'playback' },
    },
    disabledPlugins: props.string,
    overlayBackground: props.boolean,
  };

  constructor(self) {
    self = super(self);
    self.useShadow = false;

    self.defaultPlugins = ['playback'];

    index += 1;

    // These bindings are necessary to make `this` work in the callback
    self.onPlay = self.onPlay.bind(self);
    self.onPause = self.onPause.bind(self);
    self.onEnded = self.onEnded.bind(self);
    self.onDurationChange = self.onDurationChange.bind(self);
    self.onSeeked = self.onSeeked.bind(self);
    self.handleClose = self.handleClose.bind(self);
    self.collapseOnClickAway = self.collapseOnClickAway.bind(self);

    // BoltVideo.globalErrors.forEach(self.props.onError);

    self.shareDescription = self.shareDescription || 'Share This Video';

    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    self._onWindowResize = self._onWindowResize.bind(self);
    return self;
  }

  get expandedHeight() {
    return this.getAttribute('expandedHeight');
  }

  static availablePlugins = {
    playback: playbackPlugin,
    cue: cuePointsPlugin,
    social: socialPlugin,
    email: emailPlugin,
  };

  /**
   * Properties and their corresponding attributes should mirror one another.
   * To this effect, the property setter for `expanded` handles truthy/falsy
   * values and reflects those to the state of the attribute. It’s important
   * to note that there are no side effects taking place in the property
   * setter. For example, the setter does not set `aria-expanded`. Instead,
   * that work happens in the `attributeChangedCallback`. As a general rule,
   * make property setters very dumb, and if setting a property or attribute
   * should cause a side effect (like setting a corresponding ARIA attribute)
   * do that work in the `attributeChangedCallback`. This will avoid having to
   * manage complex attribute/property reentrancy scenarios.
   */
  set expandedHeight(value) {
    // Properties can be set to all kinds of string values. This makes sure
    // it’s converted to a proper boolean value using JavaScript’s truthiness
    // & falsiness principles.
    // value = Boolean(value);
    if (value) {
      this.setAttribute('expandedHeight', value);
    } else {
      this.removeAttribute('expandedHeight');
    }

    this.dispatchEvent(
      new CustomEvent('videoExpandedHeightSet', {
        detail: { expandedHeight: this.expandedHeight },
        bubbles: true,
      }),
    );
  }

  _setMetaTitle(title) {
    if (this.props.showMeta && this.props.showMetaTitle) {
      this.querySelector(`${bolt.namespace}-video-meta`).setAttribute(
        'title',
        title,
      );
    }
  }

  _setMetaDuration(seconds) {
    if (this.props.showMeta) {
      const durationFormatted = formatVideoDuration(seconds);
      this.querySelector(`${bolt.namespace}-video-meta`).setAttribute(
        'duration',
        durationFormatted,
      );
    }
  }

  _setVideoDimensions(width, height) {
    this.srcWidth = width;
    this.srcHeight = height;
  }

  _setupPlugins(elem, player) {
    // loop through any enabled plugins added, remove any flagged as being disabled, and apply what's left to the player instance.
    const enabledPlugins = Array.from(elem.enabledPlugins.split(' '));
    const disabledPlugins = elem.disabledPlugins
      ? Array.from(elem.disabledPlugins.split(' '))
      : [];
    const allPlugins = [...elem.defaultPlugins, ...enabledPlugins];

    // remove duplicates
    const uniqueAndEnabledPlugins = allPlugins.filter(function (item, index) {
      const itemName = allPlugins[index];
      return (
        allPlugins.indexOf(item) >= index &&
        disabledPlugins.includes(item) !== true
      );
    });

    // check to confirm plugins exist before initializing
    uniqueAndEnabledPlugins.forEach((pluginName) => {
      if (BoltVideo.availablePlugins) {
        if (BoltVideo.availablePlugins[pluginName]) {
          BoltVideo.availablePlugins[pluginName](player, elem);
        }
      }
    });
  }

  static handlePlayerReady(context) {
    const player = this;
    const elem = context;

    elem._setupOverlay();
    elem._setupPlugins(elem, player);

    elem.setPlayer(player);

    // If the option to show controls is set to false (meaning, no controls will be shown), make sure the video is also muted.
    if (elem.controls === false) {
      elem.player.muted(true);
    }

    // auto-configure the social overlay config (loaded via the social plugin)
    if (player.socialOverlay) {
      player.socialOverlay.options_.description = elem.props.shareDescription;
    }

    player.on('loadedmetadata', function () {
      const duration = player.mediainfo.duration;
      const title = player.mediainfo.name;
      const width = player.mediainfo.sources[1].width;
      const height = player.mediainfo.sources[1].height;

      elem._setMetaTitle(title);
      elem._setMetaDuration(duration);
      elem._setVideoDimensions(width, height);

      if (this.earlyToggle) {
        this.earlyToggle = false;
        this.toggle();
      } else if (this.earlyPlay) {
        this.earlyPlay = false;
        this.play();
      } else if (this.earlyPause) {
        this.earlyPause = false;
        this.pause();
      }
    });

    player.on('play', function () {
      elem.onPlay(player);
    });

    player.on('pause', function () {
      elem.onPause(player);
    });

    player.on('seeked', function () {
      elem.onSeeked(player);
    });

    player.on('timeupdate', function () {
      // elem.onPlay(player);
    });

    player.on('durationchange', function () {
      elem.onDurationChange(player);
    });

    player.on('ended', function () {
      elem.onEnded(player);
    });
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static getScriptUrl(accountId, playerId) {
    return `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
  }

  static getCurrentTimeMs(player) {
    return Math.round(player.currentTime() * 1000);
  }

  static getDurationMs(player) {
    return Math.round(player.duration() * 1000);
  }

  _setupOverlay() {
    this.overlayElement = this.querySelector('.vjs-overlay');

    const overlayClasses = classNames({
      [`vjs-overlay-${this.overlayAlignment}`]: this.props.overlayAlignment,
      'vjs-overlay-no-background': this.props.overlayBackground !== true,
      'vjs-overlay-background': this.props.overlayBackground === true,
    });

    if (this.overlayElement) {
      // clear out any default overlay bg classes
      this.overlayElement.classList.remove('vjs-overlay-no-background');
      this.overlayElement.classList.remove('vjs-overlay-background');
      this.overlayElement.className += ' ' + overlayClasses;
    }
  }

  handleClose() {
    this.close();
  }

  connecting() {
    this.state = {
      // IDs can't start with numbers so adding the "v" prefix to prevent JS errors
      id: `v${this.props.videoId}-${this.props.accountId}-${index}`,
      // errors: BoltVideo.globalErrors !== undefined  ? [].concat(BoltVideo.globalErrors) : [],
      isPlaying: 'paused',
      isFinished: false,
      progress: 0,
    };

    if (this.props.isBackgroundVideo) {
      this._calculateIdealVideoSize();
    }

    if (BoltVideo.globalErrors !== undefined && BoltVideo.globalErrors.length) {
      // console.log('adding default errors');
      // console.log(this.state.errors);
      this.state.errors = [].concat(BoltVideo.globalErrors);
    } else {
      this.state.errors = [];
    }

    if (this.state.errors.length) {
      // console.log(this.state.errors);
      // console.log('error length');
      return;
    }

    // only ever append script once per unique playerId
    if (!BoltVideo.players) {
      BoltVideo.players = [];
    }

    const playerId = this.props.playerId;

    if (!BoltVideo.players[playerId]) {
      BoltVideo.players[playerId] = playerId;

      const s = this.createScript();

      s.onload = () => {
        // We know Brightcove has loaded, so immediately call initVideoJS() on each video
        BoltVideo.players.forEach(function (player) {
          player.initVideoJS();
        });
      };

      // handle script not loading
      s.onerror = (err) => {
        const uriErr = {
          code: '',
          message: `The script ${err.target.src} is not accessible.`,
        };

        BoltVideo.globalErrors.push(uriErr);

        this.props.onError(uriErr);
      };

      BoltVideo.appendScript(s);
    }

    // If our video can expand/collapse we add the collapse listener and "close on escape" behavior
    if (this.props.isBackgroundVideo) {
      window.addEventListener('resize', this._onWindowResize);
      Mousetrap.bind('esc', this.handleClose, 'keyup');
      document.addEventListener('click', this.collapseOnClickAway);
    }
  }

  _onWindowResize(event) {
    this._calculateIdealVideoSize();
  }

  // If we click outside the video wrapper div collapse the video
  collapseOnClickAway(event) {
    const videoWrapper = this.querySelector('.c-bolt-video--background');
    if (!videoWrapper.contains(event.target)) {
      // @todo: debug why videos don't autoplay when this is enabled
      // this.close();
    }
  }

  disconnecting() {
    if (this.props.isBackgroundVideo) {
      window.removeEventListener('optimizedResize', this._onWindowResize);
    }

    if (this.player) {
      this.player.dispose();
      this.hasInitialized = false;
    }
  }

  onError(player) {
    this.props.onError(player.error());
  }

  hideOverlay() {
    if (this.overlayElement) {
      this.overlayElement.classList.add('vjs-overlay--hidden');

      setTimeout(() => {
        this.overlayElement.classList.add('vjs-hidden');
      }, 200);
    }
  }

  showOverlay() {
    if (this.overlayElement) {
      this.overlayElement.classList.remove('vjs-hidden');

      setTimeout(() => {
        this.overlayElement.classList.remove('vjs-overlay--hidden');
      }, 50);
    }
  }

  onPlay(player) {
    this.classList.add('is-playing');
    this.classList.remove('is-finished', 'is-paused');

    // @TODO: implement internal setState method
    // elem.setState({
    //   isPlaying: true,
    //   progress: BoltVideo.getCurrentTimeMs(player),
    //   isFinished: false
    // });

    // Dispatch an event that signals a request to expand to the
    // `<howto-accordion>` element.
    this.state.isPlaying = true;
    this.state.progress = BoltVideo.getCurrentTimeMs(player);
    this.state.isFinished = false;

    this.dispatchEvent(
      new CustomEvent('playing', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo,
        },
        bubbles: true,
      }),
    );
  }

  onPause(player) {
    const progress = BoltVideo.getCurrentTimeMs(player);

    this.classList.add('is-paused');
    this.classList.remove('is-playing');

    // @TODO: implement internal setState method
    // this.setState({
    //   isPlaying: false,
    //   progress
    // });

    this.state.isPlaying = false;
    this.state.progress = progress;

    this.dispatchEvent(
      new CustomEvent('pause', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo,
        },
        bubbles: true,
      }),
    );
  }

  onSeeked(player) {
    const progress = BoltVideo.getCurrentTimeMs(player);

    // @TODO: implement internal setState method
    // this.setState({
    //   progress: BoltVideo.getCurrentTimeMs(player),
    //   isFinished: false
    // });
    this.state.isFinished = false;
    this.state.progress = progress;
  }

  onDurationChange(player) {
    const duration = BoltVideo.getDurationMs(player);

    // @TODO: implement internal setState method
    // this.setState({ duration: BoltVideo.getDurationMs(player) });

    this.state.duration = duration;
  }

  onEnded() {
    // calling syncronously here inteferes with player and causes errors to be thrown

    setTimeout(() => {
      this.state.isFinished = true;

      this.classList.add('is-finished');
      this.classList.remove('is-paused');

      this.dispatchEvent(
        new CustomEvent('ended', {
          detail: {
            isBackgroundVideo: this.props.isBackgroundVideo,
          },
          bubbles: true,
        }),
      );
      // this.setState({ isFinished: true });
    }, 0);
  }

  _calculateIdealVideoSize() {
    this.expandedHeight = this.getBoundingClientRect().height;
  }

  setPlayer(player) {
    this.player = player;
  }

  createScript() {
    const s = document.createElement('script');

    s.src = BoltVideo.getScriptUrl(this.props.accountId, this.props.playerId);
    s.async = true;

    return s;
  }

  play() {
    if (this.player) {
      this.player.play();
    } else {
      this.earlyPlay = true;

      this.dispatchEvent(
        new CustomEvent('playing', {
          detail: {
            isBackgroundVideo: this.props.isBackgroundVideo,
          },
          bubbles: true,
        }),
      );
    }
  }

  close() {
    this.pause();

    this.dispatchEvent(
      new CustomEvent('close', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo,
        },
        bubbles: true,
      }),
    );
  }

  toggle() {
    if (this.player) {
      if (this.state.isPlaying === false || this.state.isPlaying === 'paused') {
        this.play();
      } else {
        this.pause();
      }
    } else {
      this.earlyToggle = true;

      this.dispatchEvent(
        new CustomEvent('playing', {
          detail: {
            isBackgroundVideo: this.props.isBackgroundVideo,
          },
          bubbles: true,
        }),
      );
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
    } else {
      this.earlyPause = true;
    }
  }

  initVideoJS() {
    try {
      /**
       * NOTE:
       * We delay initialization of all Brightcove videos following the steps outlined here: https://support.brightcove.com/delaying-player-instantiation
       * - Don't include 'data-account', 'data-player', and 'data-video-id' attributes on first render of the video-js element or videos will auto-initialize.
       * - Wait until this function is called to add these attributes.
       * - Then manually initialize the player here via the bc() method and pass any configuration options.
       * - This avoids multiple initializations, which has unpredictable results.
       */

      if (this.hasInitialized) {
        return;
      }

      // Setting these attributes will trigger a re-render, hence the 'hasInitialized' check above ^
      this.videoElement.setAttribute('data-account', this.accountId);
      this.videoElement.setAttribute('data-player', this.playerId);
      this.videoElement.setAttribute('data-video-id', this.videoId);

      // https://support.brightcove.com/player-configuration-guide
      // You should NOT use data-setup with Brightcove Player!
      const player = bc(this.videoElement, {
        // Force HTML5 Only Rendering + disable resizeManager in Brightcove to fix ability to click overlapping elements on iOS:
        // https://github.com/videojs/video.js/blob/22fd327076cb044c135c747086b58b7be64a747a/src/js/resize-manager.js#L19
        techOrder: ['Html5'],
        resizeManager: false,
        controlBar: {
          fullscreenToggle: !this.props.hideFullScreenButton,
        },
      });

      player.ready(() => {
        BoltVideo.handlePlayerReady.call(player, this);
      });

      // If onInit callback is set, run that now
      if (this.props.onInit) {
        if (window[this.props.onInit]) {
          window[this.props.onInit](this);
        }
      }

      this.hasInitialized = true;
    } catch (error) {
      console.log(error);
    }
  }

  rendered() {
    super.rendered && super.rendered();

    // Now that the video is rendered, add a reference to it
    this.videoElement = this.querySelector(`#${this.state.id}`);

    // If Brightcove and Video.js are loaded, init; otherwise add video to stack.
    // In most cases it's the latter, and video is initialized from the s.onload callback.
    window.bc && window.videojs
      ? this.initVideoJS()
      : BoltVideo.players.push(this);
  }

  render({ state, props }) {
    // data-email-subject="Pega - Intelligent Virtual Assistant for Email"
    // data-email-body="Check out this video from Pega"
    // data-email-videourl="https://local.d8.pega.com/insights/resources/intelligent-virtual-assistant-email"

    // const playIconEmoji = () => (
    //   <span role="img" aria-label="play-video">
    //     ▶️
    //   </span>
    // );
    // Added a wrapping div as brightcove adds siblings to the video tag
    const dataAttributes = datasetToObject(this);

    let closeButtonText = null;
    if (this.props.closeButtonText) {
      closeButtonText = this.props.closeButtonText;
    } else {
      closeButtonText = 'Close';
    }

    const classes = css(
      `t-bolt-xdark`,
      `c-${bolt.namespace}-video`,
      this.props.controls === false
        ? `c-${bolt.namespace}-video--hide-controls`
        : '',
      this.props.isBackgroundVideo
        ? `c-${bolt.namespace}-video--background`
        : '',
    );

    const videoMetaTag = `${bolt.namespace}-video-meta`;

    return (
      <span className={classes}>
        <video-js
          {...dataAttributes}
          id={this.state.id}
          {...(this.props.poster ? { poster: this.props.poster.uri } : {})}
          // Do not add these attributes or Video.js will auto init this video
          // data-account={this.props.accountId}
          // data-player={this.props.playerId}
          // data-video-id={this.props.videoId}
          data-embed="default"
          preload="none"
          // playIcon={playIconEmoji()}
          // following 'autoplay' can not expected to always work on web
          // see: https://docs.brightcove.com/en/player/brightcove-player/guides/in-page-embed-player-implementation.html
          autoPlay={this.props.autoplay}
          data-application-id
          loop={this.props.loop}
          className="video-js"
          controls={this.props.controls === false ? false : true}
        />
        {this.props.showMeta && h(videoMetaTag)}
        {this.props.isBackgroundVideo && (
          <div
            onClick={this.handleClose}
            className={css(
              `c-${bolt.namespace}-video__close-button`,
              `c-${bolt.namespace}-video__close-button--icon-to-text`,
            )}>
            <span className={`c-${bolt.namespace}-video__close-button-icon`}>
              <bolt-button
                icon-only
                size="xsmall"
                color="secondary"
                border-radius="full">
                <bolt-icon name="close" size="small" slot="after" />
              </bolt-button>
            </span>
            <span className={`c-${bolt.namespace}-video__close-button-text`}>
              <bolt-button size="small" color="text">
                {closeButtonText}
              </bolt-button>
            </span>
          </div>
        )}
      </span>
    );
  }
}

export default BoltVideo;

export { BoltVideo };
