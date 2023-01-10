'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

const BreakView = props => {
  const {
    breakLabel,
    breakClassName,
    breakLinkClassName,
    breakHandler,
    getEventListener,
  } = props;
  const className = breakClassName || 'break';

  return (
    <li className={className} role="menu-item">
      <Button
        hierarchy="transparent"
        size="small"
        borderRadius="full"
        className={breakLinkClassName}
        onKeyPress={breakHandler}
        {...getEventListener(breakHandler)}>
        {breakLabel}
      </Button>
    </li>
  );
};

BreakView.propTypes = {
  breakLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  breakClassName: PropTypes.string,
  breakLinkClassName: PropTypes.string,
  breakHandler: PropTypes.func.isRequired,
  getEventListener: PropTypes.func.isRequired,
};

export default BreakView;
