// import PropTypes from 'prop-types';
// import React from 'react';
import classNames from 'classnames';
import { define, props, withComponent, withPreact } from '@bolt/core';


@define
export class BoltDropdownItem extends withComponent(withPreact()) {
  static is = 'bolt-dropdown-item';

  static props = {
    value: props.string,
    text: props.string,
    className: props.string,
    onClick: props.any,
    onKeyPress: props.any,
    href: props.string,
    selected: props.boolean,
  }

// const BoltDropdownItem = ({
//   className,
//   value,
//   isDropdownOpen,
//   text,
//   onClick,
//   onKeyPress,
//   href,
//   selected,
//   ...other
// }) => {




  // handleClick() {
  //   const info = {
  //     value,
  //     text,
  //   };
  //   onClick(info);
  // };

  // const handleKeypress = () => {
  //   const info = {
  //     value,
  //     text,
  //   };
  //   onKeyPress(info);
  // };
  render(){
    const dropdownItemClasses = classNames({
      'c-bolt-dropdown-item': true,
      [className]: className,
    });

    return (
      <div
        value={value}
        className={dropdownItemClasses}
        tabIndex={-1}
        role="option">
        <a
          className="c-bolt-dropdown__link">
          {text}
        </a>
      </div>
    );

    // return (
    //   <li
    //     {...other}
    //     value={value}
    //     className={dropdownItemClasses}
    //     onClick={handleClick}
    //     onKeyPress={handleKeypress}
    //     tabIndex={-1}
    //     aria-selected={selected}
    //     role="option">
    //     <a
    //       tabIndex={isDropdownOpen ? 0 : -1}
    //       href={href}
    //       onClick={/* istanbul ignore next */ evt => evt.preventDefault()}
    //       className="c-bolt-dropdown__link">
    //       {text}
    //     </a>
    //   </li>
    // );
  }
};

// BoltDropdownItem.props = {
//   value: props.string,
//   text: props.string,
//   className: props.string,
//   onClick: props.any,
//   onKeyPress: props.any,
//   href: props.string,
//   selected: props.boolean,
// };

// BoltDropdownItem.defaultProps = {
//   onClick: /* istanbul ignore next */ () => { },
//   onKeyPress: /* istanbul ignore next */ () => { },
//   href: '',
//   selected: false,
// };

// export default BoltDropdownItem;