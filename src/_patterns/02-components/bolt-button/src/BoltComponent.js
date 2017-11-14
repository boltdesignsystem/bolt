// import { h, Component, render } from "preact";
import { Component, h, render, unmountComponentAtNode } from "preact";
import { props, withRenderer, withUpdate, withComponent } from 'skatejs';

// import ShadowDOM from "./ShadowDomComponent";
// import BoltRenderer from './BoltRenderer';

const { HTMLElement } = window;
const { attachShadow } = HTMLElement.prototype;
const { ShadyCSS } = window;
const $template = Symbol();
const nativeShadowDomSupport = attachShadow && attachShadow.toString().indexOf('native code') > -1;



// function style(elem, css) {
//   if (nativeShadowDomSupport) {
//     const styleElement = document.createElement('style');
//     const styleContent = document.createTextNode(css);

//     styleElement.appendChild(styleContent);

//     return styleElement;
//   } else {
//     const template = elem[$template] || (elem[$template] = document.createElement('template'));

//     template.innerHTML = `<style>${css}</style>`;
//     ShadyCSS.prepareTemplate(template, elem.localName);

//     return template;
//   }
// }



export default (Base = HTMLElement) =>
  class extends Base {

    static styleSheet = ''; 

  /* Exported function extends a base class with ShadowTemplate. */

    /**
     * Mixin for stamping a template into a Shadow DOM subtree upon component
     * instantiation.
     *
     * To use this mixin, define a `template` property as a string or HTML
     * `<template>` element:
     *
     *     class MyElement extends ShadowTemplateMixin(HTMLElement) {
     *       get [symbols.template]() {
     *         return `Hello, <em>world</em>.`;
     *       }
     *     }
     *
     * When your component class is instantiated, a shadow root will be created on
     * the instance, and the contents of the template will be cloned into the
     * shadow root. If your component does not define a `template` property, this
     * mixin has no effect.
     *
     * For the time being, this extension retains support for Shadow DOM v0. That
     * will eventually be deprecated as browsers (and the Shadow DOM polyfill)
     * implement Shadow DOM v1.
     */
      get props() {
        // We override props so that we can satisfy most use
        // cases for children by using a slot.
        return {
          ...super.props,
          ...{ children: <slot /> }
        };
      }



    _style(elem, css = this.constructor.styleSheet) {
      if (nativeShadowDomSupport) {
        return (<style>{css}</style>);
      }
      const template = elem[$template] || (elem[$template] = document.createElement('template'));
      template.innerHTML = `<style>${css}</style>`;
      ShadyCSS.prepareTemplate(template, elem.localName);
    }

      rendererCallback(renderRoot, renderCallback) {

        // console.log(this.constructor.styleSheet);

        
        // console.log(styleElement);
        // renderRoot.appendChild(styleElement);
        // this.innerHTML = '';


        this._preactDom = render(
          renderCallback(),
          renderRoot,
          this._preactDom || renderRoot.children[0]
        );

        
      }



      /*
       * If the component defines a template, a shadow root will be created on the
       * component instance, and the template stamped into it.
       */
      constructor() {
        super();
        console.log('constructor');

        // let shadowRoot = this.attachShadow({ mode: 'open' });

        // shadowRoot.innerHTML = `
        //   <style>
        //   background: red;
        //   </style>
        // `;

        // this._templateEle = document.createElement('template');
        // this._templateEle.innerHTML = `${styles} ${markup}`;

        // // create shadowDOM
        // if (!this.shadowRoot) {
        //   this.attachShadow({ mode: 'open' });
        // }

        //   // const styleElement = style(this.constructor, this.constructor.styleSheet);

        //   const clone = document.importNode(template.content, true);
        //   root.appendChild(clone);
        

        // let template = this[$template] || (this[$template] = document.createElement('template'));
        
        // template.innerHTML = this;

        // console.log(template);
        

        // let template = this[symbols.template];
        // // TODO: Save the processed template with the component's class prototype
        // // so it doesn't need to be processed with every instantiation.
        // if (template) {

        //   if (typeof template === 'string') {
        //     // Upgrade plain string to real template.
        //     
        //   }
          
        //   c

        //   if (window.ShadowDOMPolyfill) {
        //     shimTemplateStyles(template, this.localName);
        //   }

        //   const root = this.attachShadow({ mode: 'open' });

        //   // const styleElement = style(this.constructor, this.constructor.styleSheet);

        //   const clone = document.importNode(template.content, true);
        //   root.appendChild(clone);
        // }
      }
    };


  // return BoltComponent;



  // Convert a plain string of HTML into a real template element.
  function createTemplateWithInnerHTML(innerHTML) {
    const template = document.createElement('template');
    // REVIEW: Is there an easier way to do this?
    // We'd like to just set innerHTML on the template content, but since it's
    // a DocumentFragment, that doesn't work.
    const div = document.createElement('div');
    div.innerHTML = innerHTML;
    while (div.childNodes.length > 0) {
      template.content.appendChild(div.childNodes[0]);
    }
    return template;
  }

  // Invoke basic style shimming with ShadowCSS.
  function shimTemplateStyles(template, tag) {
    window.WebComponents.ShadowCSS.shimStyling(template.content, tag);
  }
