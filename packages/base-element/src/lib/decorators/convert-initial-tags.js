import { getComponentRootElement } from '../utils';

/**
 * A Class decorator that extends the `connecting()` method to find the first matching element in the component root and assign it to `this.rootElement`.
 * Components can then check for `this.rootElement` and convert that element's attributes to props.
 * Example: `<bolt-link>` will convert attributes on an `<a>` into component props.
 *
 * @param {(string|string[])} tags - A tag name or a list of tag names.
 * @param {boolean} moveChildrenToRoot - If true, moves children of the root element to the custom element root.
 * @returns {Object} - The original Class with extended `connecting()` method.
 */
const convertInitialClass = (tags, moveChildrenToRoot, clazz) => {
  return class extends clazz {
    // returns a set of key:value pairs of component properties with an `alias` name defined
    static get propAliases() {
      if (!this.properties) return {};

      // reuse aliases if this runs more than once
      if (this.propertyAliases) {
        return this.propertyAliases;
      } else {
        this.propertyAliases = {};
        this.propertyAliases = Object.keys(this.properties).reduce(
          (obj, key) => {
            if (this.properties[key].alias) {
              obj[this.properties[key].alias] = key;
            }
            return obj;
          },
          {},
        );
        return this.propertyAliases;
      }
    }

    // one-time-only processing of SSR'd HTML -- mostly to retain any extra HTML attributes added
    // + use original HTML attribute values to define component prop defaults
    connectedCallback() {
      // Make sure the component ONLY ever reuses any existing HTML ONCE.
      if (
        (this._wasInitiallyRendered === false ||
          this._wasInitiallyRendered === undefined) &&
        !this._convertedInitialTags
      ) {
        // If the initial element contains a child node, break apart the original HTML so we can retain the a tag but swap out the inner content with slots.
        let rootElement = getComponentRootElement(this.childNodes, tags);

        if (rootElement) {
          // collect any extra HTML attributes from the rootElement to retain when rendering
          this.rootElementAttributes = {};

          this.rootElement = document.createDocumentFragment();

          if (moveChildrenToRoot) {
            // Take any child elements and move them to the root of the custom element
            while (rootElement.firstChild) {
              this.appendChild(rootElement.firstChild);
            }
          }

          this.rootElement.appendChild(rootElement);
          this._convertedInitialTags = true;

          const attributes = Array.from(
            this.rootElement.firstChild.attributes,
          ).filter(attribute => attribute.name !== 'style');

          // collect any original HTML attributes off of the rootElement
          attributes.forEach(item => {
            let propNameFromAttribute;

            // rename any HTML attributes that match property aliases defined
            if (
              this.constructor.propAliases &&
              Object.keys(this.constructor.propAliases).includes(item.name)
            ) {
              propNameFromAttribute = this.constructor.propAliases[item.name];
            } else {
              propNameFromAttribute = item.name;
            }

            // use the initial HTML elem's attribute value as prop default if not already defined
            if (!this[propNameFromAttribute]) {
              this[propNameFromAttribute] = item.value;
            }

            // extra HTML attributes to include on the rendered <a> tag
            this.rootElementAttributes[item.name] = item.value;
          });
        }
      }

      // call super AFTER prep work so we can use this initial element within a component's connectedCallback
      super.connectedCallback && super.connectedCallback();
    }
  };
};

const legacyConvertInitialTags = (tags, moveChildrenToRoot = true, clazz) => {
  return convertInitialClass(tags, moveChildrenToRoot, clazz);
};

const standardConvertInitialTags = (
  tags,
  moveChildrenToRoot = true,
  descriptor,
) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return convertInitialClass(tags, moveChildrenToRoot, clazz);
    },
  };
};

// output the correct decorator syntax depending on the the env being compiled
export const convertInitialTags = (
  tags,
  moveChildrenToRoot,
) => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyConvertInitialTags(tags, moveChildrenToRoot, classOrDescriptor)
    : standardConvertInitialTags(tags, moveChildrenToRoot, classOrDescriptor);
