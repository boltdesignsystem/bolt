import { html } from '@bolt/core/renderers/renderer-lit-html';

export const AuthorName = elem => {
  const { props, slots } = elem;
  if (slots['author-name'] || props.authorName) {
    return html`
      <bolt-text
        tag="cite"
        font-size="xsmall"
        color="theme-headline"
        font-weight="bold"
      >
        ${elem.slots['author-name']
          ? elem.slot('author-name')
          : props.authorName}
      </bolt-text>
    `;
  }
};
