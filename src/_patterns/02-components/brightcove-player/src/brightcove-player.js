/* eslint-env browser */
/* globals videojs, bc */

import { define, props, withComponent } from 'skatejs';
import { withPreact } from '@bolt/core'; // Latest v. broken so using local version for now
import { h, render } from 'preact';
import { value } from 'yocss';

let index = 0;

@define
export class BrightcoveVideo extends withComponent(withPreact()) {
  static is = 'brightcove-player';

  static props = {
    width: props.number,
    height: props.number,
    videoId: props.string,
    accountId: props.string,
    playerId: props.string,
    poster: props.object,
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
      width: 320,
      height: 180,
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

    // this.attachShadow({ mode: 'open' });
  }

  get renderRoot() {
    return this;
  }

  // Called to check whether or not the component should call
  // updated(), much like React's shouldComponentUpdate().
  // updating(props, state) { 
  //   console.log(props);
  //   console.log(state);
  // }


  static handlePlayerReady(context) {
    console.log('handlePlayerReady');

    const player = this;
    const elem = context;

    elem.setPlayer(player);

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
      elem.onPlay(player);
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
      console.log('adding default errors');
      console.log(this.state.errors);
      this.state.errors = [].concat(BrightcoveVideo.globalErrors);
    } else {
      this.state.errors = [];
    }

    if (this.state.errors.length) {
      console.log(this.state.errors);
      console.log('error length');
      return;
    }

    // only ever append script once
    if (!BrightcoveVideo.players) {
      BrightcoveVideo.players = [];
      
      const s = this.createScript();

      s.onload = () => {
        BrightcoveVideo.players.forEach(function(player){
          console.log(player.state.id);
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

    console.log('init');

    this.init();
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

  // attriburtes(nextProps, nextState) {
  //   console.log('componentWillUpdate');
  //   console.log(nextProps);
  //   console.log(nextState);
  //   // const playerStatusChanged = this.state.isPlaying !== nextState.isPlaying;

  //   // if (this.state.duration !== nextState.duration) {
  //   //   this.props.onDuration(nextState.duration);
  //   // }

  //   // if (playerStatusChanged && nextState.isPlaying) {
  //   //   this.props.onPlay();
  //   // }

  //   // if (this.state.progress !== nextState.progress) {
  //   //   this.props.onProgress(nextState.progress);
  //   // }

  //   // if (playerStatusChanged && !nextState.isPlaying) {
  //   //   this.props.onPause();
  //   // }

  //   // if (
  //   //   this.state.isFinished !== nextState.isFinished &&
  //   //   nextState.isFinished
  //   // ) {
  //   //   this.props.onFinish();
  //   // }

  //   // return true;
  //   // return this.props !== nextProps;
  // }

  disconnectedCallback() {
    if (this.player) {
      this.player.dispose();
    }
  }

  onError(player) {
    this.props.onError(player.error());
  }

  onPlay(player) {
    // @TODO: implement internal setState method
    // elem.setState({
    //   isPlaying: true,
    //   progress: BrightcoveVideo.getCurrentTimeMs(player),
    //   isFinished: false
    // });

    this.state.isPlaying = true;
    this.state.progress = BrightcoveVideo.getCurrentTimeMs(player);
    this.state.isFinished = false;
  }

  onPause(player) {
    const progress = BrightcoveVideo.getCurrentTimeMs(player);

    // @TODO: implement internal setState method
    // this.setState({
    //   isPlaying: false,
    //   progress
    // });

    this.state.isPlaying = false;
    this.state.progress = progress;
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
  }

  onEnded() {
    // calling syncronously here inteferes with player and causes errors to be thrown
    setTimeout(() => {
      this.setState({ isFinished: true });
    }, 0);
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
    console.log('PLAY VIDEO');
    console.log(this.player);
    if (this.player) {
      this.player.play();
    }
  }

  toggle() {
    console.log('TOGGLE VIDEO');
    console.log(this.state);
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

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    // Preact hack https://github.com/developit/preact/issues/53
    const Nothing = () => null;
    this._preactDom = render( <Nothing/> , this._renderRoot, this._preactDom);
  }

  render({ state, props}) {
    console.log('render callback');
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
      <video
        id={this.state.id}
        {...(this.props.poster ? { poster: this.props.poster.uri } : {})}
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
    );
  }
}


// BrightcoveVideo.globalErrors = [];
//BrightcoveVideo.props = defaults;

// customElements.define('brightcove-player', BrightcoveVideo);

// customElements.define('brightcove-player', BrightcoveVideo);
// 44
// 45	  const el = new PreactComponentWrapper();


// export default BrightcoveVideo;
