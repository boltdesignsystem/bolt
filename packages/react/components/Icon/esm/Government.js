import * as React from 'react';
import getIconClasses from '../lib';

function SvgGovernment(props) {
  const classes = getIconClasses(props);
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={props.style}
      aria-hidden={true}>
      <path
        clipRule="evenodd"
        d="M17 17v10c0 .6.4 1 1 1s1-.4 1-1V17c0-.6-.4-1-1-1s-1 .4-1 1m-4 0v10c0 .6.4 1 1 1s1-.4 1-1V17c0-.6-.4-1-1-1s-1 .4-1 1M3 17v10c0 .5.4 1 .9 1H4c.5 0 1-.4 1-.9V17c0-.5-.4-1-.9-1H4c-.5 0-1 .4-1 .9zm27 13H2c-.6 0-1 .4-1 1s.4 1 1 1h28c.6 0 1-.4 1-1s-.4-1-1-1M7 17v10c0 .5.4 1 .9 1H8c.5 0 1-.4 1-.9V17c0-.5-.4-1-.9-1H8c-.5 0-1 .4-1 .9zm-5-3h28c.6 0 1-.4 1-1s-.4-1-1-1H2c-.6 0-1 .4-1 1s.4 1 1 1m21 3v10c0 .6.4 1 1 1s1-.4 1-1V17c0-.6-.4-1-1-1s-1 .4-1 1M16 6c2.4 0 4.4 1.7 4.9 4h2c-.4-3.1-2.8-5.5-5.9-5.9V1c0-.6-.4-1-1-1s-1 .4-1 1v3.1c-3.1.4-5.5 2.8-5.9 5.9h2c.5-2.3 2.5-4 4.9-4m11 11v10c0 .6.4 1 1 1s1-.4 1-1V17c0-.6-.4-1-1-1s-1 .4-1 1"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgGovernment;
