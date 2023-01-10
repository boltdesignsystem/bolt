import React from 'react';
import { createRoot } from 'react-dom/client';
import Select from '.';
import ControlledNestedSelect from './ControlledNestedSelect';
import { setHierarchy, getFlattenedOptions } from './utils';

Drupal.behaviors.ReactSelect = {
  attach: (context, settings) => {
    const data = settings?.pega_react_select;

    if (!data) return;

    const selectKeys = Object.keys(data);

    selectKeys.forEach(keyname => {
      const select = data[keyname];
      const {
        name,
        options,
        defaultValue,
        isMulti,
        placeholder,
        required,
        closeMenuOnSelect,
        isClearable,
        hideSelectedOptions,
        delimiter,
        isNested,
        useControlledNestedSelect,
      } = select;

      if (!(name && options.length)) return;

      // Load React Select
      const selector = `[data-react-select=${name}]`;
      const target = context.querySelector(selector);
      const sharedProps = {
        name,
        options,
        defaultValue,
        isMulti,
        placeholder,
        required,
        closeMenuOnSelect,
        isClearable: isClearable || true,
        hideSelectedOptions: isNested ? false : hideSelectedOptions,
        // ',' outputs selcted options to a comma-separated list on a hidden field
        delimiter: delimiter || ',',
        onChange: (value, inputAction) => {
          target.dispatchEvent(
            new CustomEvent('react-select:onChange', {
              bubbles: true,
              detail: {
                name,
                data: { value, inputAction },
              },
            }),
          );
        },
      };

      if (target) {
        const root = createRoot(target);
        root.render(
          useControlledNestedSelect ? (
            <ControlledNestedSelect {...sharedProps} />
          ) : (
            <Select
              {...sharedProps}
              options={
                isNested ? getFlattenedOptions(setHierarchy(options)) : options
              }
            />
          ),
          target,
        );

        // Clear out this select's settings after React component renders. We only
        // do this because Drupal can't seem to merge initial settings with updated
        // settings on ajax requests. In arrays (for example, select `options` prop)
        // Drupal will just add new settings to the old, does not replace or dedupe.
        settings.pega_react_select[keyname] = {};
      } else {
        // console.warn(`Selector '${selector}' not found`);
      }
    });
  },
};
