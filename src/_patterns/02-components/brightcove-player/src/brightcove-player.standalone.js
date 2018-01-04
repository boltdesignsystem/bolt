/* eslint-env browser */
/* globals videojs, bc */
import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes
} from '@bolt/core';

let index = 0;


@define
class BrightcoveMeta extends withComponent(withPreact()) {
  static is = 'brightcove-meta'

  static props = {
    duration: props.string
  }

  render() {
    return (
      <div>Duration: {this.duration}</div>
    );
  }
}


@define
class BrightcoveVideo extends withComponent(withPreact()) {
  static is = 'brightcove-player';

  static props = {
    videoId: props.string,
    accountId: props.string,
    playerId: props.string,
    poster: props.object,
    isBackgroundVideo: props.boolean,
    // onError: null,
    // onPlay: null,
    // onPause: null,
    // onFinish: null,
    // onProgress: null,
    // onDuration: null,
    autoplay: props.boolean,
    resetOnFinish: props.boolean,
    directToFullscreen: props.boolean,
    hideFullScreenButton: props.boolean
  }

  constructor() {
    super();
    index += 1;

    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
    // this.onProgress = this.onProgress.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onSeeked = this.onSeeked.bind(this);

    // BrightcoveVideo.globalErrors.forEach(this.props.onError);

    this.defaultProps = {
      // width: 320,
      // height: 180,
      // playerId: "default",
      // onError: () => { },
      // onPlay: () => { },
      // onPause: () => { },
      // onFinish: () => { },
      // onProgress: () => { },
      // onDuration: () => { },
      autoplay: false,
      hideFullScreenButton: false,
      directToFullscreen: false,
      resetOnFinish: false
    }


    // Ensure that 'this' inside the _onWindowResize event handler refers to <bolt-nav-link>
    // even if the handler is attached to another element (window in this case)
    this._onWindowResize = this._onWindowResize.bind(this);

    // this.attachShadow({ mode: 'open' });
  }

  get renderRoot() {
    return this;
  }


  get expandedHeight() {
    return this.getAttribute('expandedHeight');
  }
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
    if (value)
      this.setAttribute('expandedHeight', value);
    else
      this.removeAttribute('expandedHeight');

    this.dispatchEvent(
      new CustomEvent('expandedHeightSet', {
        detail: { expandedHeight: this.expandedHeight },
        bubbles: true,
      })
    );
  }

  // Called to check whether or not the component should call
  // updated(), much like React's shouldComponentUpdate().
  // updating(props, state) {
  //   console.log(props);
  //   console.log(state);
  // }

  _setDuration(time){
    this.querySelector('brightcove-meta').setAttribute('duration', time);
  }

  _setVideoDimensions(width, height) {
    this.srcWidth = width;
    this.srcHeight = height;
  }

  static handlePlayerReady(context) {
    const player = this;
    const elem = context;

    elem.setPlayer(player);

    player.on("loadedmetadata", function () {
      const duration = player.mediainfo.duration;
      const width = player.mediainfo.sources[1].width;
      const height = player.mediainfo.sources[1].height;

      elem._setDuration(duration);
      elem._setVideoDimensions(width, height);
      elem._calculateIdealVideoSize();
    });

    player.on("play", function(){
      elem.onPlay(player);
    });

    player.on("pause", function () {
      elem.onPause(player);
    });

    player.on("seeked", function () {
      elem.onSeeked(player);
    });

    player.on("timeupdate", function () {
      // elem.onPlay(player);
    });

    player.on("durationchange", function () {
      elem.onDurationChange(player);
    });

    player.on("ended", function () {
      elem.onEnded(player);
    });

    // this.contextmenu({ disabled: true });
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static getScriptUrl(accountId, playerId) {
    return `//players.brightcove.net/${accountId}/${
      playerId
    }_default/index.min.js`;
  }

  static getCurrentTimeMs(player) {
    return Math.round(player.currentTime() * 1000);
  }

  static getDurationMs(player) {
    return Math.round(player.duration() * 1000);
  }

  // static isBackgroundVideo() {
  //   return this.props.isBackgroundVideo;
  // }


  connectedCallback() {
    this.state = {
      id: `${this.props.videoId}-${this.props.accountId}-${index}`,
      // errors: BrightcoveVideo.globalErrors !== undefined  ? [].concat(BrightcoveVideo.globalErrors) : [],
      isPlaying: "paused",
      isFinished: false,
      progress: 0
    };

    if (this.defaultProps) {
      const defaultProps = this.defaultProps;
      for (const propName in defaultProps) {
        if (this.props[propName] === undefined) {
          this.props[propName] = defaultProps[propName];
        }
      }
    }

    if (BrightcoveVideo.globalErrors !== undefined && BrightcoveVideo.globalErrors.length) {
      // console.log('adding default errors');
      // console.log(this.state.errors);
      this.state.errors = [].concat(BrightcoveVideo.globalErrors);
    } else {
      this.state.errors = [];
    }

    if (this.state.errors.length) {
      // console.log(this.state.errors);
      // console.log('error length');
      return;
    }

    // only ever append script once
    if (!BrightcoveVideo.players) {
      BrightcoveVideo.players = [];

      const s = this.createScript();

      s.onload = () => {
        BrightcoveVideo.players.forEach(function(player){
          player.initVideoJS(player.state.id)
        });
      };

      // handle script not loading
      s.onerror = err => {
        const uriErr = {
          code: "",
          message: `The script ${err.target.src} is not accessible.`
        };

        BrightcoveVideo.globalErrors.push(uriErr);

        this.props.onError(uriErr);
      };

      BrightcoveVideo.appendScript(s);
    }

    // console.log('init');

    this.init();


    window.addEventListener('optimizedResize', this._onWindowResize);
  }


  _onWindowResize(event){
    this._calculateIdealVideoSize();
  }

  // shouldUpdate(props, state) {
  //   return true;
  // }

  // Called when props have been set regardless of if they've changed.
  // updating(props) { }

  /**
     * `attributeChangedCallback` processes changes to the `expanded` attribute.
     */
  // attributeChangedCallback(attributeName, oldValue, newValue) {
  //   console.log(attributeName);
  //   // `expanded` is a boolean attribute it is either set or not set. The
  //   // actual value is irrelevant.
  //   // const value = this.hasAttribute('expanded');
  //   // this._shadowButton.setAttribute('aria-expanded', value);
  // }
  updating({ props, state }) {

    // console.log(props);
    // console.log(state);
    // const playerStatusChanged = this.state.isPlaying !== nextState.isPlaying;

    // if (this.state.duration !== nextState.duration) {
    //   this.props.onDuration(nextState.duration);
    // }

    // if (playerStatusChanged && nextState.isPlaying) {
    //   this.props.onPlay();
    // }

    // if (this.state.progress !== nextState.progress) {
    //   this.props.onProgress(nextState.progress);
    // }

    // if (playerStatusChanged && !nextState.isPlaying) {
    //   this.props.onPause();
    // }

    // if (
    //   this.state.isFinished !== nextState.isFinished &&
    //   nextState.isFinished
    // ) {
    //   this.props.onFinish();
    // }

    // return true;
    // return this.props !== nextProps;
  }

  disconnectedCallback() {
    window.removeEventListener('optimizedResize', this._calculateIdealVideoSize);

    if (this.player) {
      this.player.dispose();
    }
  }

  onError(player) {
    this.props.onError(player.error());
  }

  onPlay(player) {

    this.classList.add('is-playing');
    this.classList.remove('is-finished');
    this.classList.remove('is-paused');

    // @TODO: implement internal setState method
    // elem.setState({
    //   isPlaying: true,
    //   progress: BrightcoveVideo.getCurrentTimeMs(player),
    //   isFinished: false
    // });

    // Dispatch an event that signals a request to expand to the
    // `<howto-accordion>` element.
    this.state.isPlaying = true;
    this.state.progress = BrightcoveVideo.getCurrentTimeMs(player);
    this.state.isFinished = false;

    this.dispatchEvent(
      new CustomEvent('playing', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo
        },
        bubbles: true,
      })
    );
  }

  onPause(player) {
    const progress = BrightcoveVideo.getCurrentTimeMs(player);

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
          isBackgroundVideo: this.props.isBackgroundVideo
        },
        bubbles: true,
      })
    );
  }

  onSeeked(player) {
    const progress = BrightcoveVideo.getCurrentTimeMs(player);

    // @TODO: implement internal setState method
    // this.setState({
    //   progress: BrightcoveVideo.getCurrentTimeMs(player),
    //   isFinished: false
    // });
    this.state.isFinished = false;
    this.state.progress = progress;
  }

  onDurationChange(player) {
    const duration = BrightcoveVideo.getDurationMs(player);

    // @TODO: implement internal setState method
    // this.setState({ duration: BrightcoveVideo.getDurationMs(player) });

    this.state.duration = duration;
    this._setDuration(duration);
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
            isBackgroundVideo: this.props.isBackgroundVideo
          },
          bubbles: true,
        })
      );
      // this.setState({ isFinished: true });
    }, 0);
  }


  _calculateIdealVideoSize() {
    const srcWidth = this.srcWidth;
    const srcHeight = this.srcHeight;

    if (this.srcWidth && this.srcHeight){
      const maxRatio = .5625; //56.25%
      const maxWidth = this.querySelector('video').getBoundingClientRect().width;
      const maxHeightOption1 = maxWidth * maxRatio;
      const maxHeightOption2 = window.innerHeight * maxRatio;

      const maxHeight = Math.min(maxHeightOption1, maxHeightOption2);

      let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

      const idealMaxWidth = Math.round(srcWidth * ratio * 100) / 100;
      const idealMaxHeight = Math.round(srcHeight * ratio * 100) / 100;

      // If maxHeight has already been pre-defined BUT that value is larger than the calculated `ideal` maxHeight, use the ideal maxHeight value instead and ignore the taller user-defined value.
      // if (this.maxHeight && this.maxHeight > idealMaxHeight) {
      this.expandedHeight = idealMaxHeight;
      // }
    }
  }

  setPlayer(player) {
    this.player = player;
  }

  createScript() {
    const s = document.createElement("script");
    // console.log(this.props);

    s.src = BrightcoveVideo.getScriptUrl(
      this.props.accountId,
      this.props.playerId
    );

    return s;
  }

  initVideoJS(id) {
    const player = videojs(id);
    const handler = BrightcoveVideo.handlePlayerReady.bind(player, this);
    // player.on("ready", handler);
    player.ready(handler);

    // player.on("error", this.onError.bind(this, player));
  }

  initVideo(id) {
    bc(this.querySelector(`#${id}`), {
      controlBar: {
        fullscreenToggle: !this.props.hideFullScreenButton
      }
    });

    this.initVideoJS(id);
  }

  init() {
    if (window.bc && window.videojs) {
      this.initVideo(this.state.id);
    } else {
      BrightcoveVideo.players.push(this);
    }
  }

  play() {
    // console.log('PLAY VIDEO');
    // console.log(this.player);
    if (this.player) {
      this.player.play();
    }
  }

  close() {
    this.pause();

    this.dispatchEvent(
      new CustomEvent('close', {
        detail: {
          isBackgroundVideo: this.props.isBackgroundVideo
        },
        bubbles: true,
      })
    );
  }

  toggle() {
    // console.log('TOGGLE VIDEO');
    // console.log(this.state);
    if (this.player) {
      if (this.state.isPlaying === false || this.state.isPlaying === 'paused'){
        this.play();
      } else {
        this.pause();
      }
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
    }
  }


  render({ state, props }) {
    // console.log('render callback');
    // data-email-subject="Pega - Intelligent Virtual Assistant for Email"
    // data-email-body="Check out this video from Pega"
    // data-email-videourl="https://local.d8.pega.com/insights/resources/intelligent-virtual-assistant-email"

    // const playIconEmoji = () => (
    //   <span role="img" aria-label="play-video">
    //     ▶️
    //   </span>
    // );
    /* eslint jsx-a11y/media-has-caption: "off" */
    // Added a wrapping div as brightcove adds siblings to the video tag

    return(
      <div>
        <video
          id={this.state.id}
          {...(this.props.poster ? { poster: this.props.poster.uri } : {}) }
          data-embed="default"
          data-video-id={this.props.videoId}
          data-account={this.props.accountId}
          data-player={this.props.playerId}
          // playIcon={playIconEmoji()}
          // following 'autoplay' can not expected to always work on web
          // see: https://docs.brightcove.com/en/player/brightcove-player/guides/in-page-embed-player-implementation.html
          autoPlay={this.props.autoplay}
          data-application-id
          className="video-js"
          controls
        />
        <brightcove-meta />
      </div>
    );
  }
}

export default BrightcoveVideo;



// BrightcoveVideo.globalErrors = [];
//BrightcoveVideo.props = defaults;

// customElements.define('brightcove-player', BrightcoveVideo);

// customElements.define('brightcove-player', BrightcoveVideo);
// 44
// 45	  const el = new PreactComponentWrapper();


// export default BrightcoveVideo;


// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function () {
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
  // such as scroll.
  throttle("resize", "optimizedResize");
})();