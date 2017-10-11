// const { nativeShadow } = ShadyCSS;
import { hasNativeShadowDomSupport } from './environment';
const $template = Symbol();


/**
 * Generate a scoped style element for the given element
 *
 * @see https://github.com/skatejs/skatejs/issues/1027#issuecomment-277382741
 * @private
 * @param {Component} elem the element to generate a style for
 * @param {string} css the stylesheet to scope
 * @return {HTMLElement} the style elememnt to add to the component
 */
function style(elem, css) {
  if (hasNativeShadowDomSupport) {
    const styleElement = document.createElement('style');
    const styleContent = document.createTextNode(css);

    styleElement.appendChild(styleContent);

    return styleElement;
  } else {
    const template = elem[$template] || (elem[$template] = document.createElement('template'));

    template.innerHTML = `<style>${css}</style>`;
    window.ShadyCSS.prepareTemplate(template, elem.localName);

    return template;
  }
}

/**
 * Mixin to add automatic styling to a Skatejs component
 *
 * @param {skatejs~Component} superclass the superclass to add features to
 * @returns {skatejs~Component} the new class, with added features
 */
export default function StyledMixin(superclass) {
  return class extends superclass {
    /**
    * By setting the `styleSheet` attribute on a class, a new custom
    * element can be created that will automatically have the styles
    * injected into the component.
    *
    * In browsers that have native support for the ShadowDOM, the
    * stylesheet will be added such that the styles are all scoped to
    * that custom element.
    *
    * In browsers that do not have native support for the ShadowDOM,
    * ShadyCSS will be used to scope the styles to the element. Note
    * that ShadyCSS can only scope `:host` and class definitions, so
    * styles should only be defined that use those techniques.
    *
    * @property {string} styleSheet the stylesheet for this element
    * @abstract
    */
    // static styleSheet = ''

    /**
    * Adds a `<style>` tag to the custom element's shadow DOM
    *
    * @return
    */

    renderedCallback() {
      super.renderedCallback();

      const styleElement = style(this, this.constructor.styleSheet);
      this.shadowRoot.appendChild(styleElement);
    }
  };
}