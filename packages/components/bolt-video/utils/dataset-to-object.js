import dasherize from 'dasherize';

// Loop through any extra (unknown) data attributes on the main element; copy over to the <video> tag being rendered
export function datasetToObject(elem) {
  var data = {};
  [].forEach.call(elem.attributes, function (attr) {
    if (/^data-/.test(attr.name)) {
      data[dasherize(attr.name)] = attr.value;
    }
  });
  return data;
}
