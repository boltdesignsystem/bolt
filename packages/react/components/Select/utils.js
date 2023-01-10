// Add data related to parent/child relationship
export const setHierarchy = (options, indent = true) => {
  const markHierarchy = (option, isChild, childOf) => {
    const data = {};

    if (option.children?.length) {
      data.isParent = true;
    }

    if (isChild) {
      data.isChild = true;
      data.childOf = childOf;
      if (indent) {
        data.isIndented = true;
      }
    }

    let updatedOpt = { ...option, ...data };

    if (option.children?.length) {
      updatedOpt = {
        ...updatedOpt,
        children: option.children.map(child =>
          markHierarchy(child, true, option.value),
        ),
      };
    }

    return updatedOpt;
  };

  return options.map(o => markHierarchy(o));
};

// Return nested object as flattened array
export const getFlattenedOptions = options => {
  return options
    .flatMap(option => {
      return [option, option.children?.map(child => child)].flat();
    })
    .filter(option => option !== undefined)
    .map(option => {
      // Remove children now that data is flattened
      const { children, ...otherData } = option;
      return otherData;
    });
};

// Derive selected options from provided options - for example, if all
// children are selected, select the parent and deselect the children
export const getDerivedSelectedOptions = (options, selectedOptions) => {
  const selectedValues = selectedOptions?.map(opt => opt.value);
  let updatedSelectedOptions = selectedOptions;

  options.forEach(opt => {
    if (opt.isParent) {
      const isSelected = selectedValues.includes(opt.value);
      const childOptions = options.filter(o => o.childOf === opt.value);
      const childValues = childOptions.map(o => o.value);

      if (isSelected) {
        // if parent is selected. deselect children
        updatedSelectedOptions = updatedSelectedOptions.filter(
          o => !childValues.includes(o.value),
        );
      } else {
        // if all children are selected, select parent, deselect children
        const allChildrenAreSelected =
          childValues.filter(val => !selectedValues.includes(val)).length === 0;
        if (allChildrenAreSelected) {
          updatedSelectedOptions = updatedSelectedOptions.filter(
            o => !childValues.includes(o.value),
          );
          updatedSelectedOptions.push(opt);
        }
      }
    }
  });

  return updatedSelectedOptions;
};

// Add data related to "checked" state
export const getMarkedOptions = (options, selectedOptions) => {
  if (!selectedOptions) {
    return options;
  }

  const selectedValues = selectedOptions?.map(opt => opt.value);
  const checkedValues = [];

  return options.map(option => {
    const data = {};
    const isSelected = selectedValues.includes(option.value);

    if (isSelected || checkedValues.includes(option.value)) {
      data.isChecked = true;
    }

    if (option.isParent) {
      const children = options.filter(o => o.childOf === option.value);
      const childrenValues = children.map(o => o.value);
      const includesAnySelectedValue = children.some(o =>
        selectedValues.includes(o.value),
      );

      if (isSelected) {
        checkedValues.push(...childrenValues);
      }

      if (includesAnySelectedValue) {
        data.isIndeterminate = true;
      }
    }

    return { ...option, ...data };
  });
};

// Get default value as array, always returns array so we don't have to check again later
export const getDefaultValueAsArray = value => {
  return typeof value === 'undefined' || value === null
    ? []
    : Array.isArray(value)
    ? value
    : [value];
};
