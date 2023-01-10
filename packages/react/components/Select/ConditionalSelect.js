import React from 'react';
import { setHierarchy, getDefaultValueAsArray } from './utils';
import { FormElement, Label } from '..';
import Select from '.';

const ConditionalSelect = props => {
  const {
    name,
    options,
    defaultValue,
    placeholder,
    childIsMulti,
    onChange,
    dispatchState,
  } = props;

  const markedOptions = setHierarchy(options, false);
  const selectedOptions = getDefaultValueAsArray(defaultValue);
  const selectedValues = selectedOptions.map(o => o.value);
  let childProps;

  const getChildPropsFromOption = option => {
    const { children, label } = option;

    return {
      // placeholder: label,
      options: children,
      defaultValue: defaultValue.filter(o => {
        const childValues = children.map(o => o.value);
        return childValues.includes(o.value);
      }),
    };
  };

  if (selectedOptions.length) {
    const selectedParentOption = markedOptions.find(o => {
      return selectedValues.includes(o.value) && o.isParent;
    });

    if (selectedParentOption) {
      childProps = getChildPropsFromOption(selectedParentOption);
    }
  }

  const onChangeHandler = (value, inputAction) => {
    const isMultiChild = value?.length && value[0].isChild;
    let previousValue;

    if (!isMultiChild) {
      if (value) {
        if (value.isChild) {
          if (!childIsMulti && childProps.defaultValue.length) {
            previousValue = childProps.defaultValue[0];
          }
        } else {
          if (defaultValue?.length) {
            previousValue = defaultValue[0];
          }
        }
      }
    }

    let val = {
      value,
      inputAction,
    };

    if (previousValue) {
      val = { ...val, previousValue };
    }

    dispatchState({
      type: 'SELECT_CHANGE',
      val,
    });
    if (typeof onChange === 'function') {
      onChange(value, inputAction);
    }
  };

  return (
    <>
      <FormElement
        label={placeholder}
        labelDisplay="invisible"
        className="c-base-input-list__item--spacing-xsmall">
        {/* @TODO Be sure 'data-url' is passed through */}
        <Select
          {...props}
          name={name}
          defaultValue={defaultValue?.find(o => !o.isChild)}
          options={markedOptions}
          onChange={onChangeHandler}
          hideSelectedOptions={false}
          isClearable={!childProps?.defaultValue.length}
        />
      </FormElement>
      {childProps && (
        <FormElement
          label={
            <Label
              className="u-bolt-visuallyhidden"
              displayType="block"
              htmlFor="input-text-required">
              Text input type
            </Label>
          }
          labelDisplay="invisible">
          <Select
            {...childProps}
            isMulti={childIsMulti}
            isClearable={true}
            onChange={onChangeHandler}
          />
        </FormElement>
      )}
    </>
  );
};

export default ConditionalSelect;
