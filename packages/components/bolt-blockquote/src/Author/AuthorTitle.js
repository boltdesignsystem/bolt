import { html } from '@bolt/core/renderers/renderer-lit-html';

export const AuthorTitle = elem => {
  const { props, slots } = elem;
  if (slots['author-title'] || props.authorTitle) {
    return html`
      <bolt-text tag="cite" font-size="xsmall" color="theme-headline">
        ${elem.slots['author-title']
          ? elem.slot('author-title')
          : props.authorTitle}
      </bolt-text>
    `;
  }
};
