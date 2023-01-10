import sanitizeHtml from 'sanitize-html';

const createSanitizedMarkup = content => {
  return { __html: sanitizeHtml(content) };
};

export default createSanitizedMarkup;
