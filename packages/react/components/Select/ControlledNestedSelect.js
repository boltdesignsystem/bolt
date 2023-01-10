import React, { useEffect, useState } from 'react';
import {
  setHierarchy,
  getFlattenedOptions,
  getDerivedSelectedOptions,
  getMarkedOptions,
} from './utils';
import Select from '.';

const ControlledNestedSelect = props => {
  const { name, options, defaultValue, onChange } = props;

  // Mark options with parent/child data, then flatten
  const updatedOptions = getFlattenedOptions(setHierarchy(options));

  // `getDerivedSelectedOptions` is run only once on initial load to derive
  // selected options from provided options, @see './utils.js'
  const derivedSelectedOptions = getDerivedSelectedOptions(
    updatedOptions,
    defaultValue,
  );

  // Mark options with "checked/indeterminate" data
  const markedOptions = getMarkedOptions(
    updatedOptions,
    derivedSelectedOptions,
  );

  const [controlledOptions, setControlledOptions] = useState(markedOptions);
  const [selectedOptions, setSelectedOptions] = useState(
    derivedSelectedOptions,
  );

  const onChangeHandler = (value, inputAction) => {
    const { action } = inputAction;
    let updatedSelectedOptions;

    if (!value) {
      updatedSelectedOptions = null;
    } else {
      const option = props.isMulti ? inputAction.option : value;
      const selectedOptionsArr = props.isMulti ? value : [value];
      const selectedValues = selectedOptionsArr?.map(o => o.value);
      updatedSelectedOptions = selectedOptionsArr;

      const deselectChildren = (option, selectedOptions) => {
        const children = updatedOptions.filter(o => o.childOf === option.value);
        const childValues = children.map(o => o.value);

        return selectedOptions.filter(o => !childValues.includes(o.value));
      };

      switch (action) {
        case 'deselect-option':
          if (option.isParent) {
            // When you deselect a parent, also deselect all children
            updatedSelectedOptions = deselectChildren(
              option,
              updatedSelectedOptions,
            );
          }
          break;
        case 'select-option':
          if (option.isParent) {
            // When you select a parent, deselect all children (they will
            // appear as checked but are not actually selected)
            updatedSelectedOptions = deselectChildren(
              option,
              updatedSelectedOptions,
            );
          } else if (option.isChild) {
            const parent = updatedOptions.find(o => o.value === option.childOf);
            const parentIsSelected = selectedValues.includes(parent.value);
            const siblings = updatedOptions.filter(
              o => o.childOf === option.childOf,
            );
            const siblingValues = siblings.map(o => o.value);
            const allSiblingsAreSelected =
              siblings.filter(o => {
                return !selectedValues.includes(o.value);
              }).length === 0;

            if (parentIsSelected) {
              // If parent is selected...

              // Deselect parent
              updatedSelectedOptions = updatedSelectedOptions.filter(
                o => o.value !== parent.value,
              );

              // Deselect this option
              updatedSelectedOptions = updatedSelectedOptions.filter(
                o => o.value !== option.value,
              );

              // Select all sibling options
              const otherSiblings = siblings.filter(
                o => o.value !== option.value,
              );

              otherSiblings.forEach(o => {
                if (!selectedValues.includes(o.value)) {
                  updatedSelectedOptions.push(o);
                }
              });
            } else if (allSiblingsAreSelected) {
              // if all siblings are selected...

              // Select parent
              if (!parentIsSelected) {
                updatedSelectedOptions.push(parent);
              }
              // Deselect siblings
              updatedSelectedOptions = updatedSelectedOptions.filter(
                o => !siblingValues.includes(o.value),
              );
            }
          }
          break;
      }
    }

    setSelectedOptions(updatedSelectedOptions);

    // If you pass an onChange function to this component it will be called now.
    // You cannot override it completely or the component does not work.
    // @TODO: commenting out as value/inputAction is not in sync with the controlled options.
    // if (typeof onChange === 'function') {
    //   onChange(value, inputAction);
    // }
  };

  // Runs on initial render and each time selectedOptions change
  useEffect(() => {
    const markedOptions = getMarkedOptions(updatedOptions, selectedOptions);
    setControlledOptions(markedOptions);
  }, [selectedOptions]);

  return (
    <Select
      {...props}
      name={name}
      value={selectedOptions}
      options={controlledOptions}
      onChange={onChangeHandler}
      hideSelectedOptions={false}
    />
  );
};

export default ControlledNestedSelect;
