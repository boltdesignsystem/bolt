import Select, { components } from 'react-select';
import SelectWithValidation from './SelectWithValidation';
import { customStyles, customTheme } from './styles';
import { IconClose, IconChevronDown, IconCheck, IconMinus } from '../Icon';

// https://github.com/JedWatson/react-select/issues/3739
const ClearIndicator = props => {
  return (
    <components.ClearIndicator {...props}>
      <IconClose />
    </components.ClearIndicator>
  );
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <IconChevronDown size="medium" />
    </components.DropdownIndicator>
  );
};

const Option = props => {
  const optionLabelClass = 'c-base-react-select__option-label';

  return (
    <components.Option {...props}>
      <div className={optionLabelClass}>{props.children}</div>
      <OptionIcon {...props} />
    </components.Option>
  );
};

const OptionIcon = props => {
  const iconClass = 'c-base-react-select__option-icon';

  return props.isSelected || props.data.isChecked ? (
    <div className={iconClass}>
      <IconCheck />
    </div>
  ) : props.data.isIndeterminate ? (
    <div className={iconClass}>
      <IconMinus />
    </div>
  ) : null;
};

const CustomSelect = props => {
  return (
    <SelectWithValidation
      {...props}
      // Custom Styles
      styles={customStyles}
      theme={customTheme}
      // Custom Icons
      components={{ ClearIndicator, DropdownIndicator, Option }}
      // Opinionated defaults
      tabSelectsValue={false}
      // Workaround for native HTML validation
      SelectComponent={Select}
    />
  );
};

export default CustomSelect;
