export function validateProps(propData, validateSchema) {
  const validatedData = propData;
  const validate = validateSchema;

  // remove default strings in prop data so schema validation can fill in the default
  for (let property in validatedData) {
    if (validatedData[property] === '') {
      delete validatedData[property];
    }
  }

  let isValid = validate(validatedData);

  // bark at any schema validation errors
  if (!isValid) {
    console.log(validate.errors);
  }

  return validatedData;
}
