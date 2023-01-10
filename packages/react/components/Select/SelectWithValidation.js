import React from 'react';
import PropTypes from 'prop-types';

// Support for native HTML validation is in progress: https://github.com/JedWatson/react-select/issues/4327
// Temporarily workaround: https://github.com/JedWatson/react-select/issues/4327#issuecomment-747968573
// Code below copied from: https://codesandbox.io/s/react-select-v2-required-input-3xvvb

const noop = () => {
  // no operation (do nothing real quick)
};

class SelectWithValidation extends React.Component {
  state = {
    value: this.props.value || '',
  };

  selectRef = null;

  setSelectRef = ref => {
    this.selectRef = ref;
  };

  onChange = (value, actionMeta) => {
    this.props.onChange(value, actionMeta);
    this.setState({ value });
  };

  getValue = () => {
    if (this.props.value !== undefined) return this.props.value;
    return this.state.value || '';
  };

  render() {
    const { SelectComponent, required, ...props } = this.props;
    const { isDisabled } = this.props;
    const enableRequired = !isDisabled;

    return (
      <div>
        <SelectComponent
          {...props}
          ref={this.setSelectRef}
          onChange={this.onChange}
        />
        {enableRequired && (
          <input
            tabIndex={-1}
            autoComplete="off"
            style={{
              opacity: 0,
              width: '100%',
              height: 0,
              position: 'absolute',
            }}
            value={this.getValue()}
            onChange={noop}
            onFocus={() => this.selectRef.focus()}
            required={required}
          />
        )}
      </div>
    );
  }
}

SelectWithValidation.defaultProps = {
  onChange: noop,
};

SelectWithValidation.protoTypes = {
  // react-select component class (e.g. Select, Creatable, Async)
  selectComponent: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default SelectWithValidation;
