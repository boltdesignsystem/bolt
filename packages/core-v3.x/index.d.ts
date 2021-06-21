import { WithComponent } from 'skatejs';
export { props, define } from 'skatejs';
import { TemplateResult } from 'lit-html';
export { html, render } from 'lit-html';

interface BoltBaseClass extends HTMLElement {
  new(): BoltBaseClass;
  setState({}): void;
  setupSlots(): void;
  setupShadow(): void;
  addStyles(stylesheet: any): TemplateResult;
}

export function BoltBase(): BoltBaseClass;

interface BoltLitHtmlBase extends WithComponent, BoltBaseClass {
  new(): BoltLitHtmlBase;
  renderStyles(styles: string): TemplateResult;
  slot(name: string): void;
  /** executes `lit-html`s `render()` */
  renderer(root: any, call: any): void;
}

export function withLitHtml(Base?: HTMLElement): BoltLitHtmlBase;

export const hasNativeShadowDomSupport: boolean;
