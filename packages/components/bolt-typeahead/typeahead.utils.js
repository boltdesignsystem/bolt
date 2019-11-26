import ReactHtmlParser from 'react-html-parser';

export const highlightSearchResults = function(item, cx) {
  const resultItem = item;
  resultItem.matches.forEach(matchItem => {
    const text = resultItem.item[matchItem.key];
    const result = [];
    const matches = [].concat(matchItem.indices);
    let pair = matches.shift();

    if (text) {
      for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (pair && i === pair[0]) {
          result.push(
            `<strong class="${cx('c-bolt-typeahead__result-highlight')}">`,
          );
        }
        result.push(char);
        if (pair && i === pair[1]) {
          result.push('</strong>');
          pair = matches.shift();
        }
      }
      resultItem.item.highlightedLabel = result.join('');

      resultItem.item.highlightedLabel = ReactHtmlParser(
        resultItem.item.highlightedLabel,
      );

      if (resultItem.children && resultItem.children.length > 0) {
        resultItem.children.forEach(child => {
          highlightSearchResults(child);
        });
      }
    }
  });
};
