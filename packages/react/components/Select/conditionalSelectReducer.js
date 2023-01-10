import {
  setHierarchy,
  getFlattenedOptions,
  getDefaultValueAsArray,
} from './utils';

export const getSelectsFromProps = (options, defaultValue) => {
  const selectedOptions = getDefaultValueAsArray(defaultValue);
  const selectedValues = selectedOptions.map(o => o.value);

  // Mark up the options with the necessary data, then flatten
  const markedOptions = setHierarchy(options, false);
  const flattenedOptions = getFlattenedOptions(markedOptions);

  const uniqueSelectedOptions = markedOptions.filter(o =>
    selectedValues.includes(o.value),
  );
  const uniqueSelectedValues = uniqueSelectedOptions.map(o => o.value);

  return selectedValues
    .map(val => {
      const option = flattenedOptions.find(o => o.value === val);

      // We only return parent and single options. Children options are handled later on by the ConditionalSelect component.
      if (option.isChild) return;

      return {
        key: option.value,
        options: options.filter(
          o =>
            !uniqueSelectedValues.includes(o.value) || o.value === option.value,
        ),
        defaultValue: option.isParent
          ? [
              option,
              ...selectedValues
                .map(o => {
                  const flatOpt = flattenedOptions.find(opt => opt.value === o);
                  if (flatOpt.childOf === option.value) {
                    return flatOpt;
                  }
                })
                .filter(x => typeof x !== 'undefined'),
            ]
          : [option],
      };
    })
    .filter(x => typeof x !== 'undefined');
};

export const canShowAddMore = selects => {
  const selectWithoutValue = !!selects.find(o => !o?.defaultValue?.length);

  return !selects.length || selectWithoutValue ? false : true;
};

const reducer = (state, action) => {
  const { options, defaultValue, selects } = state;
  const { type, val } = action;
  const markedOptions = setHierarchy(options, false);
  const flattenedOptions = getFlattenedOptions(markedOptions);
  let updatedSelects, updatedSelectedOptions;

  switch (type) {
    case 'ADD_SELECT':
      const defaultIds = defaultValue.map(o => o.value);
      const availableOptions = options.filter(
        o => !defaultIds.includes(o.value),
      );

      updatedSelects = [...selects, { options: availableOptions }];

      const updatedState = {
        ...state,
        options,
        defaultValue,
        selects: updatedSelects,
        showAddMore: canShowAddMore(updatedSelects),
      };

      return updatedState;

    case 'SELECT_CHANGE':
      if (val) {
        const { value, inputAction, previousValue } = val;
        const { action, removedValues } = inputAction;

        updatedSelectedOptions = defaultValue;

        const removeSelectedChildrenByParent = (
          parent,
          options,
          selectedOptions,
        ) => {
          const childValues = options
            .filter(o => o.childOf === parent.value)
            .map(o => o.value);

          // Remove previous value's child options
          return selectedOptions.filter(o => !childValues.includes(o.value));
        };

        switch (action) {
          case 'select-option':
            const isMultiChild = value.length && value[0].isChild;

            if (isMultiChild) {
              const childValues = value.map(o => o.value);
              const selectedValues = updatedSelectedOptions.map(o => o.value);
              const newValues = childValues.filter(
                v => !selectedValues.includes(v),
              );
              const newOptions = flattenedOptions.filter(o =>
                newValues.includes(o.value),
              );
              updatedSelectedOptions.push(...newOptions);
            } else {
              if (previousValue) {
                if (previousValue.isParent) {
                  updatedSelectedOptions = removeSelectedChildrenByParent(
                    previousValue,
                    flattenedOptions,
                    updatedSelectedOptions,
                  );
                }

                // Replace previous value with current value
                const index = updatedSelectedOptions.findIndex(
                  o => o.value === previousValue.value,
                );

                if (index !== -1) {
                  updatedSelectedOptions[index] = value;
                } else {
                  console.warn(
                    'Something went wrong. `previousValue` should always match a value in `updatedSelectedOptions`.',
                  );
                }
              } else {
                updatedSelectedOptions.push(value);
              }
            }

            break;
          case 'deselect-option':
            // @TODO needed for isMulti option
            break;
          case 'clear':
            const removedValuesArr = removedValues.map(option => option.value);

            updatedSelectedOptions = updatedSelectedOptions.filter(
              option => !removedValuesArr.includes(option.value),
            );

            break;
        }
      }

      updatedSelects = getSelectsFromProps(options, updatedSelectedOptions);

      return {
        ...state,
        defaultValue: updatedSelectedOptions,
        selects: updatedSelects,
        showAddMore: canShowAddMore(updatedSelects),
      };

    default:
      console.warn(`"${type}" is not a valid type`);
  }
};

export default reducer;
