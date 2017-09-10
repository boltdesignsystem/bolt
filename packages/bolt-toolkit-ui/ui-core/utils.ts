import { Component } from 'skatejs';
import { hasNativeShadowDomSupport } from './environment';

const $template = Symbol();

export function scopeCss( elem: Component<any> & { [ key: string ]: any }, css: string ): string | void {
  if ( hasNativeShadowDomSupport ) {
    return css;
  }
  const template = elem[ $template ] || ( elem[ $template ] = document.createElement( 'template' ) );
  template.innerHTML = `<style>${css}</style>`;
  window.ShadyCSS.prepareTemplate( template, elem.localName );
}
