/**
 * Filter out entries from an object.
 *
 * @param obj - object to filter.
 * @param fn - filter function.
 * @returns a new object without the entries satisfying the filter function.
 */
export function filterObject(obj, fn) {
  return Object.keys(obj).reduce((accum, property) => {
    const value = obj[property];

    if (fn(value, property, obj)) {
      accum[property] = value;
    }

    return accum;
  }, {});
}

/**
 * Check if given parameter is not undefined.
 *
 * @param value - value to check.
 * @returns whether the value is defined.
 */
export function isDefined(value) {
  return typeof value !== 'undefined';
}

/**
 * Create the select options.
 *
 * @param value - Array of options w/ value and label text
 * @returns List of option elements as JSX element.
 */
export function createSelectOptions(options) {
  const selectOptions = Array.from(options);
  return selectOptions.map(
    option =>
      wire(
        this,
      )`<option value=${option.value} selected=${option.selected}>${option.text}</option>`,
  );
}

/**
 * Creates an array the select option data
 *
 * @param value - Array of options w/ value and label text
 * @returns Object of option data
 */
export function createSelectOptionData(options) {
  const selectOptions = Array.from(options);
  const newOptions = [];

  selectOptions.forEach(function(option) {
    const { value, selected, text } = option;

    newOptions.push({
      label: text || null,
      value: value || null,
      selected: selected || false,
    });
  });

  return newOptions;
}
