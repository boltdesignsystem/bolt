/**
 * Prepare schema by removing properties + merging $ref data that the Form can't handle normally
 * @param {object} schema - original schema to be cleaned up
 * @returns {object} newSchema
 */
export function prepSchema(schema) {
  // Can't use `Object.assign`
  const newSchema = schema;
  if (newSchema.not) {
    delete newSchema.not;
  }

  // temporarily remove the Drupal-specific attributes object -- workaround to form error
  try {
    if (newSchema.properties['attributes']) {
      delete newSchema.properties['attributes'];
    }
  } catch (error) {
    // console.log('attributes does not exist!');
  }

  for (let property in newSchema.properties) {
    if (newSchema.properties[property].title === 'DEPRECATED') {
      delete newSchema.properties[property];
    }

    try {
      if (newSchema.properties[property].hidden === true) {
        delete newSchema.properties[property];
      }
    } catch (error) {
      // console.log('hidden does not exist!');
    }

    try {
      if (newSchema.properties[property].ref) {
        delete newSchema.properties[property].ref;
      }
    } catch (error) {
      // console.log('ref does not exist!');
    }

    try {
      if (newSchema.properties[property]['$ref']) {
        if (newSchema.properties[property].properties) {
          delete newSchema.properties[property].properties;
        }
      }
    } catch (error) {
      // console.log('$ref does not exist!');
    }
  }

  return newSchema;
}
