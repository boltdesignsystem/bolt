import { mq } from '../utilities';

// https://react-select.com/styles#overriding-the-theme
export const customTheme = theme => {
  return {
    ...theme,
    borderRadius: '3px',
  };
};

// See https://react-select.com/styles for complete list of style keys
export const customStyles = {
  // Clear icon container
  clearIndicator: (provided, state) => {
    return {
      ...provided,
      padding:
        'var(--bolt-spacing-y-xsmall) var(--bolt-spacing-x-xxsmall) var(--bolt-spacing-y-xsmall) 0',
      lineHeight: '1',
      color: 'var(--bolt-color-black)',
      cursor: 'pointer',
      transition: 'color 200ms ease-in-out',
      '&:hover': {
        color: 'var(--bolt-color-navy-light)',
      },
    };
  },

  // Dropdown icon container
  dropdownIndicator: (provided, state) => {
    return {
      ...provided,
      padding:
        'var(--bolt-spacing-y-xsmall) var(--bolt-spacing-x-small) var(--bolt-spacing-y-xsmall) var(--bolt-spacing-x-xxsmall)',
      lineHeight: '1',
      color: 'var(--bolt-color-black)',
      cursor: 'pointer',
      transition: 'color 200ms ease-in-out',
      '&:hover': {
        color: 'var(--bolt-color-navy-light)',
      },
    };
  },

  // Dropdown icon container
  indicatorSeparator: (provided, state) => {
    return {
      ...provided,
      display: 'none',
    };
  },

  // Wrapper around input, including menu icons
  control: (provided, state) => {
    return {
      ...provided,
      minHeight: 0,
      cursor: 'text',
      boxShadow: 'none',
      borderColor: state.isFocused
        ? 'var(--bolt-color-navy-light)'
        : 'var(--bolt-color-gray-light)',
      transition:
        'border var(--bolt-transition), box-shadow var(--bolt-transition)',
      '&:hover': {
        boxShadow: state.isFocused
          ? 'none'
          : '0 1px 4px 1px rgb(6 10 36 / 10%), 0 5px 10px 0 rgb(6 10 36 / 8%)',
      },
    };
  },

  // The element you actually type into
  input: (provided, state) => {
    return {
      ...provided,
      fontFamily: 'var(--bolt-type-font-family-body)',
      fontSize: 'var(--bolt-type-font-size-small)',
      lineHeight: 'calc(var(--bolt-type-line-height-xsmall) * 1em - 1px)',
      [mq('small', true)]: {
        fontSize: '16px',
      },
      '& input': {
        font: 'inherit',
      },
    };
  },

  // The chip container
  multiValue: (provided, state) => {
    return {
      ...provided,
      backgroundColor: 'rgba(141, 142, 153, 0.16)',
      borderRadius: '100em',
      cursor: 'default',
    };
  },

  // The chip text wrapper
  multiValueLabel: (provided, state) => {
    return {
      ...provided,
      fontFamily: 'var(--bolt-type-font-family-body)',
      fontSize: 'var(--bolt-type-font-size-xsmall)',
      lineHeight:
        'calc(var(--bolt-type-line-height-xsmall) * var(--bolt-type-line-height-multiplier-tight))',
      color: 'var(--bolt-color-black)',
      // Note using individual rules too override provided padding-left rule
      paddingTop: 'calc(var(--bolt-spacing-y-xsmall) / 2)',
      paddingLeft: 'var(--bolt-spacing-x-xsmall)',
      paddingBottom: 'calc(var(--bolt-spacing-y-xsmall) / 2)',
      paddingRight: 'calc(var(--bolt-spacing-x-xsmall) / 2)', // half amount
    };
  },

  // The chip remove element
  multiValueRemove: (provided, state) => {
    return {
      ...provided,
      borderRadius: '0 100em 100em 0',
      overflow: 'hidden',
      // Note using individual rules too override provided padding-left, padding-right rule
      paddingTop: 'calc(var(--bolt-spacing-y-xsmall)/ 2)',
      paddingLeft: 'calc(var(--bolt-spacing-x-xsmall) / 2)', // half amount
      paddingBottom: 'calc(var(--bolt-spacing-y-xsmall) / 2)',
      paddingRight: 'calc(var(--bolt-spacing-x-xsmall) / 2)',
      color: 'var(--bolt-color-black)',
      cursor: 'pointer',
      transition: 'all 200ms ease-in-out',
      '&:hover': {
        color: 'var(--bolt-color-white)',
        backgroundColor: 'var(--bolt-color-error)',
      },
    };
  },

  // Menu dropdown container
  menu: (provided, state) => {
    return {
      ...provided,
      left: '1px',
      width: 'calc(100% - 2px)',
      marginTop: 'var(--bolt-spacing-y-xxsmall)',
      marginBottom: 'var(--bolt-spacing-y-xxsmall)',
    };
  },

  // Item in the menu dropdown
  option: (provided, state) => {
    return {
      ...provided,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `var(--bolt-spacing-y-small) var(--bolt-spacing-x-small) var(--bolt-spacing-y-small) var(--bolt-spacing-x-${
        state.data.isIndented ? 'medium' : 'small'
      })`,
      fontFamily: 'var(--bolt-type-font-family-body)',
      fontSize: 'var(--bolt-type-font-size-small)',
      lineHeight: 'var(--bolt-type-line-height-small)',
      color: state.isDisabled
        ? 'var(--m-bolt-neutral)'
        : 'var(--bolt-color-black)',
      cursor: state.isDisabled ? 'default' : 'pointer',
      pointerEvents: state.isDisabled ? 'none' : undefined,
      borderLeft:
        state.isFocused && !state.isDisabled
          ? '3px solid var(--bolt-color-navy-light)'
          : '3px solid transparent',
      backgroundColor:
        state.isFocused && !state.isDisabled
          ? 'rgba(141, 142, 153, 0.16)'
          : 'transparent',
      transition:
        'border-left var(--bolt-transition), background-color var(--bolt-transition)',
      '&:active': {
        backgroundColor: state.isDisabled
          ? 'transparent'
          : 'var(--bolt-color-navy-xlight)',
      },
      '& > .c-base-react-select__option-icon': {
        marginLeft: 'var(--bolt-spacing-x-xsmall)',
      },
    };
  },

  // Empty state
  noOptionsMessage: (provided, state) => {
    return {
      ...provided,
      padding: 'var(--bolt-spacing-y-small) var(--bolt-spacing-x-small)',
      fontFamily: 'var(--bolt-type-font-family-body)',
      fontSize: 'var(--bolt-type-font-size-small)',
      lineHeight: 'var(--bolt-type-line-height-small)',
      color: 'var(--bolt-color-black)',
    };
  },

  // Placeholder text
  placeholder: (provided, state) => {
    return {
      ...provided,
      fontFamily: 'var(--bolt-type-font-family-body)',
      fontSize: 'var(--bolt-type-font-size-small)',
      lineHeight: 'calc(var(--bolt-type-line-height-xsmall) * 1em - 1px)',
      [mq('small', true)]: {
        fontSize: '16px',
      },
    };
  },

  // Wrapper around selected options and input text
  valueContainer: (provided, state) => {
    // Chips have 2px additional margin and text input have 2px padding.
    // Use this var to offset that amount so height matches Bolt input.
    const offset = 4;
    return {
      ...provided,
      padding: `calc(var(--bolt-spacing-y-medium) / 2 - ${
        // Extra 1px to match line-height, which adds a pixel to match button's line-height
        offset + 1
      }px) calc(var(--bolt-spacing-x-small) - ${offset}px)`,
      [mq('small', true)]: {
        paddingTop: `calc(var(--bolt-spacing-y-medium) / 2 - ${offset}px - 0.1875rem)`,
        paddingBottom: `calc(var(--bolt-spacing-y-medium) / 2 - ${offset}px - 0.25rem)`,
      },
    };
  },
};
