import {
  // BoltComponent,
  spacingSizes,
  // utils
} from '@bolt/core';
import { props, withComponent } from 'skatejs';
const Component = withComponent();
// import withBolt from "./BoltComponent";

import styles from './button.scss';
import { setTimeout } from 'core-js/library/web/timers';
const css = styles[0][1];
// import { h, Component } from 'preact';
// import withPreact from '@skatejs/renderer-preact';

const { HTMLElement } = window;
const { attachShadow } = HTMLElement.prototype;
const { ShadyCSS } = window;
const $template = Symbol();
const nativeShadowDomSupport = attachShadow && attachShadow.toString().indexOf('native code') > -1;

// function style(elem, css) {
//   if (nativeShadowDomSupport) {
//     return <style>{css}</style>;
//   }
//   const template = elem[$template] || (elem[$template] = document.createElement('template'));
//   template.innerHTML = `<style>${css}</style>`;
//   ShadyCSS.prepareTemplate(template, elem.localName);
// }



function style(elem, css) {
  // if (nativeShadowDomSupport) {
  //   const styleElement = document.createElement('style');
  //   const styleContent = document.createTextNode(css);

  //   styleElement.appendChild(styleContent);

  //   return styleElement;
  // } else {
  //   const template = elem[$template] || (elem[$template] = document.createElement('template'));

  //   template.innerHTML = `<style>${css}</style>`;
  //   ShadyCSS.prepareTemplate(template, elem.localName);

  //   return template;
  // }

  // const template = elem[$template] || (elem[$template] = document.createElement('template'));

  // template.innerHTML = `<style>${css}</style>`;

  // window.ShadyCSS.prepareTemplate(template, elem.localName);

  // return template.content;
}

const CustomStyleInterface = window.ShadyCSS.CustomStyleInterface;


class BoltButton extends Component {
    static get is() {
      return 'bolt-button';
    }
    constructor() {
      super();
      // CustomStyleInterface.addCustomStyle(this);
    }

  static props = {
    name: props.string,
    style: props.style
    // size: props.string,
    // background: props.string
  }

  // getStyle() {
  //   return this.querySelector('style');
  // }

  // connectedCallback() {
  //   window.ShadyCSS.styleElement(this);
  //   // if (!this.shadowRoot) {
  //   //   this.attachShadow({ mode: 'open' });
  //   //   this.shadowRoot.appendChild(
  //   //     document.importNode(myElementTemplate.content, true));
  //   // }
  // }
  // static styleSheet = css
  // get style() {
  //   return styles
  // }
  // {this._style(this, this.styleSheet)}

  // renderCallback({ props }) {
  //   return (
  //     <div>
  //       <style>{css}</style>
  //       <slot />
  //     </div>
  //   );
  // }
    // renderCallback() {
    //   return [
    //     ,
    //     <div>
    //       <span class="span">shadow </span>
    //       <span class="slot"><slot /></span>
    //     </div>
    //   ];
    // }
  

  rendererCallback(renderRoot, renderCallback) {
    renderRoot.innerHtml = '';
    renderRoot.appendChild(renderCallback());
    window.ShadyCSS.styleElement(this);
    window.ShadyCSS.styleDocument();
  }
  renderCallback() {
    // window.ShadyCSS.styleElement(this);
    // const styles = style(this, css);
    let currentMarkup = document.createElement('template');
    currentMarkup = `<style>${css}</style>`;
    currentMarkup += this.innerHTML;

    const template = this[$template] || (this[$template] = document.createElement('template'));
    template.innerHTML = currentMarkup;

    window.ShadyCSS.prepareTemplate(template, this.localName);

    // this.shadowRoot.appendChild(document.importNode(template.content, true))

    var clone = document.importNode(template.content, true);

    return clone;

    // 
    // clone.insertBefore(styles, clone.childNodes[0]);
    
    // 
    // template.innerHTML = `<style>${css}</style>`;



    // return template.content;


    

    

    // window.ShadyCSS.styleSubtree(clone);
    // this.shadowRoot.appendChild(
    //   document.importNode(clone, true));

    // this.innerHTML = ''; // Clean out the original HTML since the ShadowDOM takes over from here.

    // window.ShadyCSS.styleElement(this);
    // window.ShadyCSS.styleDocument();
    
    // return clone;
  }

}

customElements.define('bolt-button', BoltButton);






