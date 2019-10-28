import kebabCase from 'param-case';

/**
 * Is this a child of that parent element?
 * @param {HTMLElement} el
 * @param {string} tagName
 * @returns {boolean}
 */
export function isChildOfEl(el, tagName) {
  return el.parentElement && el.parentElement.tagName === tagName.toUpperCase();
}

/**
 * @typedef {Object} SchemaProp - JSON schema individual property
 * @prop {string} type one of 'boolean' or 'string' (if `enum` then select else text field)
 * @prop {string} [title]
 * @prop {string} [description]
 * @prop {string[]} [enum] all the `<option>`s for the `<select>`, requires `type: 'string'`
 * @prop {any} [default]
 */

/**
 * @typedef {Object} JsonSchema
 * @prop {string} [title]
 * @prop {string} [description]
 * @prop {string[]} [required]
 * @prop {{ [key: string]: SchemaProp }} properties
 */

class SchemaPropToTraitError extends Error {}

/**
 * @param {Object} opt
 * @param {SchemaProp} opt.prop JSON Schema Prop
 * @param {string} [opt.name] machine name of value, will be passed to web components as HTML attributes; will be kebab-cased
 * @returns {import('grapesjs').GrapeTrait}
 * @throws {SchemaPropToTraitError}
 */
export function convertSchemaPropToTrait({ name, prop }) {
  /** @type {import('grapesjs').GrapeTrait} */
  const trait = {
    label: prop.title || name,
    name: kebabCase(name),
    type: 'text',
  };

  if (prop.default) trait.default = prop.default;

  switch (prop.type) {
    case 'string':
      if (prop.enum) {
        trait.type = 'select';
        trait.options = prop.enum;
      } else {
        trait.type = 'text';
      }
      break;
    case 'boolean':
      trait.type = 'checkbox';
      break;
    case 'number':
      trait.type = 'number';
      break;
    default:
      console.error({ prop, name });
      throw new SchemaPropToTraitError(
        `Cannot convert schema prop "${trait.label}" of type "${prop.type}" to trait`,
      );
  }
  return trait;
}

/**
 * @param {Object} opt
 * @param {HTMLElement} opt.space
 * @param {HTMLElement} opt.canvasWrapper
 * @return {string} class name added
 */
export function addThemeContextClasses({ space, canvasWrapper }) {
  const themeClasses = [
    '.t-bolt-xlight',
    '.t-bolt-light',
    '.t-bolt-medium',
    '.t-bolt-dark',
    '.t-bolt-xdark',
  ];
  let themeClass = '';
  const themeContextEl = space.closest(themeClasses.join(', '));
  if (themeContextEl) {
    themeContextEl.classList.forEach(className => {
      if (themeClasses.includes(`.${className}`)) {
        themeClass = className;
      }
    });
  }
  if (themeClass) {
    canvasWrapper.classList.add(themeClass);
  }
  return themeClass;
}

/**
 * Wrap a component in a numbered `bolt-interactive-step`.
 *
 * @param {string} starter: The starter HTML to wrap. Should not include bolt-interactive-step
 * @param {number} numberOfSteps The quantity of numbered steps to get.
 * @returns {string}
 */
export function getStepsLorem(starter, numberOfSteps) {
  let returnVal = '';
  for (let i = 1; i <= numberOfSteps; i++) {
    returnVal = `${returnVal}
    <bolt-interactive-step tab-title="Lorem ipsum step ${i}">
      ${starter}
    </bolt-interactive-step>
  `;
  }
  return returnVal;
}
