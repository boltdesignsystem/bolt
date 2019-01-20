import { define, props } from 'skatejs';
import { h } from 'preact';

const classNames = require('classnames');
import render from 'preact-render-to-string';

import { store } from '../../store.js'; // connect to redux
import { updateCurrentUrl } from '../../actions/app.js'; // redux actions
import { BaseComponent } from '../base-component.js';
import { urlHandler, patternName } from '../../utils';

import styles from '../../../sass/pattern-lab--iframe-loader.scss';

import iFrameResize from 'iframe-resizer/src/iframeResizer.js';


@define
class IFrame extends BaseComponent {
  static is = 'pl-iframe';

  constructor(self) {
    self = super(self);
    self.useShadow = false;
    self.styleguideReady = false;
    self.receiveIframeMessage = self.receiveIframeMessage.bind(self);
    //set up the default for the
    self.baseIframePath =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname.replace('index.html', '');
    self.defaultIframePath = self.baseIframePath + '?p=components-overview';
    return self;
  }

  connected(){
    const self = this;
    const state = store.getState();
    this.themeMode = state.app.themeMode;
    this.isViewallPage = state.app.isViewallPage;
    this.currentUrl = state.app.currentUrl;
    window.addEventListener('message', this.receiveIframeMessage, false);
  }

  _stateChanged(state) {
    if (this.iframe){
      if (this.iframe.iFrameResizer){
        this.iframe.iFrameResizer.sendMessage(state);
      } else {
        this.delaySendingMessage = true;
      }
    } else {
      this.delaySendingMessage = true;
    }
  }

  navigateTo(pattern = patternName, rewrite = false) {
    const patternPath = urlHandler.getFileName(pattern);
    this.iFramePath =
      patternPath !== ''
        ? this.baseIframePath + patternPath + '?' + Date.now()
        : this.defaultIframePath;

    if (rewrite === true){
      window.history.replaceState(
        {
          pattern,
        },
        null,
        null
      );
      urlHandler.skipBack = true;
    }

    this.iframe.contentWindow.location.replace(this.iFramePath);
    urlHandler.pushPattern(pattern, patternPath);
  }

  handleUpdatingCurrentUrl(){
    setTimeout(() => {
      if (URLSearchParams !== undefined){
        var urlParams = new URLSearchParams(window.location.search);
        const currentUrl = urlParams.get('p');

        if (currentUrl){
          store.dispatch(updateCurrentUrl(currentUrl));
        }
      }
    }, 25);
  }
  
  rendered(){
    super.rendered && super.rendered();
    this.iframe = this.querySelector('.pl-js-iframe');

    const self = this;

    if (this.styleguideReady === false){
      if (patternName !== 'all') {
        this.navigateTo(patternName, true);
        this.styleguideReady = true;
      }
    }

    iFrameResize({
      checkOrigin: false,
      initCallback(){
        if (self.delaySendingMessage === true){
          self.delaySendingMessage = false;
    
          const state = store.getState();
          self.iframe.iFrameResizer.sendMessage(state);
        }
      }
    }, this.iframe);
  }

  render() {
    const IframeInner = () => {
      return (
        <div className={`pl-c-body--theme-${this.themeMode}`}>
          <style>{styles[0][1]}</style>
          <div className={'pl-c-loader'}>
            <div className={'pl-c-loader__content'}>
              <div className={'pl-c-loader__message'}>Loading Pattern Lab</div>
              <div className={'pl-c-loader__spinner'}>
                <svg className={'pl-c-loader-svg'} viewBox={'0 0 268 255'}>
                  <circle
                    className={'pl-c-loader-svg__outer-circle'}
                    cx={'134.2'}
                    cy={'127.6'}
                    r={'115.1'}
                  />
                  <circle
                    className={'pl-c-loader-svg__inner-circle'}
                    cx={'134.2'}
                    cy={'127.6'}
                    r={'66.3'}
                  />
                  <path
                    className={'pl-c-loader-svg__electron'}
                    d={
                      'M253,56.3c0,15.6-12.6,28.2-28.2,28.2s-28.2-12.6-28.2-28.2s12.6-28.2,28.2-28.2C240.3,28.1,253,40.7,253,56.3z'
                    }
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div class="pl-c-viewport pl-js-viewport">
        <div class="pl-c-viewport__cover pl-js-viewport-cover" />
        <div class="pl-c-viewport__iframe-wrapper pl-js-vp-iframe-container">
          <iframe
            className={`pl-c-viewport__iframe pl-js-iframe pl-c-body--theme-${this.themeMode}`}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            srcdoc={render(<IframeInner />)}
          />
          {
            this.state.isViewallPage === false && (
              <div class="pl-c-viewport__resizer pl-js-resize-container">
                <div class="pl-c-viewport__resizer-handle pl-js-resize-handle" />
              </div>
            )
          }
        </div>
      </div>
    );
  }

  receiveIframeMessage(event) {
    const self = this;

    // does the origin sending the message match the current host? if not dev/null the request
    if (
      window.location.protocol !== 'file:' &&
      event.origin !== window.location.protocol + '//' + window.location.host
    ) {
      return;
    }

    let data = {};
    try {
      data =
        typeof event.data !== 'string' ? event.data : JSON.parse(event.data);
    } catch (e) {
      // @todo: how do we want to handle exceptions here?
    }

    if (data.event !== undefined && data.event === 'patternLab.pageLoad') {
      try {
        // add a slight delay to make sure the URL params have had a chance to update first before updating the current url 
        self.handleUpdatingCurrentUrl();
      } catch(error){
        console.log(error);
      }
    }
  }
}

export { IFrame };
