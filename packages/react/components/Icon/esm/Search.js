import * as React from 'react';
import getIconClasses from '../lib';

function SvgSearch(props) {
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
        d="M12 20.9c-4.9 0-8.8-4-8.8-8.8 0-4.9 4-8.8 8.8-8.8s8.8 4 8.8 8.8c.1 4.8-3.9 8.8-8.8 8.8m19.5 8.4l-10-10c1.5-2 2.5-4.5 2.5-7.3 0-6.6-5.4-12-12-12S0 5.4 0 12s5.4 12 12 12c2.7 0 5.3-.9 7.3-2.5l10 10c.3.3.7.5 1.1.5s.8-.2 1.1-.5c.7-.6.7-1.6 0-2.2"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgSearch;
