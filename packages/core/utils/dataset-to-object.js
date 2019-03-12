import changeCase from 'change-case';

// Loop through any extra (unknown) data attributes on the main element; copy over to the <video> tag being rendered
export function datasetToObject(elem) {
  let data = {};
  if (elem.dataset) {
    for (const item in elem.dataset) {
      data[`data-${changeCase.kebabCase(item)}`] = elem.dataset[item];
    }
  }
  return data;
}
