import { props } from 'skatejs/dist/esnext';

/**
 * Convert JSON Schema to SkateJS Props for Web Component
 * Only converts simple, non-nested data types: strings, numbers, booleans
 * @param {Object} schema
 * @return {import('skatejs').PropOptions} myProps
 * @example js
 * static props = convertSchemaToProps(schema);
 */
export function convertSchemaToProps(schema) {
  if (!schema || !schema.properties) {
    throw new Error('Cannot convert empty JSON schema to Props');
  }

  const myProps = {};

  Object.keys(schema.properties).forEach((prop) => {
    const info = schema.properties[prop];
    switch (info.type) {
      case 'number':
      case 'boolean':
      case 'string':
        const type = props[info.type];
        myProps[prop] = Object.assign({}, type, {
          default: info.default,
        });
        break;
    }
  });

  return myProps;
}
