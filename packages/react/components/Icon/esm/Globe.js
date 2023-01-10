import * as React from 'react';
import getIconClasses from '../lib';

function SvgGlobe(props) {
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
        d="M16 0c2.9 0 5.6.7 8 2.1s4.4 3.4 5.8 5.8c1.4 2.5 2.1 5.1 2.1 8s-.7 5.6-2.1 8-3.4 4.4-5.8 5.8c-2.5 1.4-5.1 2.1-8 2.1s-5.6-.7-8-2.1-4.4-3.2-5.9-5.7S0 18.9 0 16s.7-5.6 2.1-8S5.5 3.6 8 2.1 13.1 0 16 0zm5.7 10.9l-.2.2c-.1.1-.2.2-.3.2 0 0 .1 0 .1-.1s.1-.1.1-.2.1-.1.1-.1c.1-.1.2-.2.5-.3.2-.1.6-.2 1.1-.2.5-.1.8 0 1.1.2 0 0 0-.1.2-.3s.3-.2.3-.2.1-.1.3-.1.3-.1.3-.2v-.5c-.2 0-.3 0-.4-.1s-.1-.3-.1-.4c0 0 0 .1-.1.2 0-.1 0-.2-.1-.2h-.4c-.1 0-.2-.1-.3-.2s-.1-.2-.2-.3c0-.2-.1-.3-.1-.3 0-.1-.1-.1-.2-.2l-.2-.2s0-.1-.1-.1c0 0 0-.1-.1-.1s0-.1-.1-.1l-.1-.1s-.1 0-.1.1l-.2.2c0 .1-.1.1-.1.1h-.2s-.1 0-.1.1l-.1.1s-.1 0-.2.1h-.2c.2-.1.2-.1 0-.2-.1-.1-.2-.1-.3-.1.1-.1.2-.1.2-.2s-.1-.2-.2-.3h.1c0-.1-.1-.1-.2-.2s-.2-.4-.3-.4-.2-.1-.3-.1c-.1-.1-.3-.1-.7-.2s-.6-.1-.7 0-.1.2-.1.2c0 .1 0 .2.1.3 0 .1.1.2.1.3s0 .2-.1.3-.2 0-.2.1.1.2.3.3.3.3.2.4c0 .1-.2.2-.3.3-.2.1-.3.2-.3.2-.1.1-.1.2 0 .4 0 .1.1.3.2.3v.1s0 .1-.1.1l-.1.1s-.1 0-.1.1h-.1c-.2.1-.3 0-.4-.1-.2 0-.3-.2-.3-.4-.1-.3-.2-.6-.3-.6-.3-.1-.5-.1-.6 0-.1-.2-.4-.4-.9-.5-.4-.2-.8-.2-1.2-.1.1 0 .1-.1 0-.3s-.2-.3-.4-.2c0-.1.1-.2.1-.4v-.3c0-.2.1-.3.2-.5 0 0 .1-.1.1-.2s.1-.2.2-.3c0-.1.1-.1 0-.1.5.1.8 0 1-.2.1-.1.1-.2.2-.4s.2-.3.2-.4c.1-.1.2-.1.3-.1s.2 0 .3.1.2.1.3.1c.2 0 .3-.1.3-.2 0-.2 0-.3-.2-.4.2 0 .2-.1.1-.4-.1-.1-.1-.2-.2-.2-.2-.1-.4 0-.6.1-.1.1-.1.1 0 .2l-.2.2c-.1.2-.2.3-.3.4s-.2 0-.3-.1c0 0-.1-.1-.1-.3s.1-.2 0-.2-.2.1-.3.3c0-.1 0-.2-.2-.3s-.4-.2-.5-.2c.3-.2.2-.4-.2-.6-.1-.1-.2-.1-.4-.1s-.3 0-.4.1-.1.2-.1.2c0 .1 0 .1.1.2.1 0 .1.1.2.1s.1.1.2.1.1 0 .2.1c.2.1.2.2.2.3 0 0-.1 0-.2.1s-.2.1-.2.1c-.1 0-.1.1-.1.1V5c-.1-.1-.1-.2-.2-.4s-.1-.3-.1-.3c.1.1-.1.2-.5.1h-.9c-.1 0-.2-.1-.3-.2-.3-.1-.3-.2-.2-.4 0-.1 0-.1.1 0-.1 0-.1-.1-.2-.2s-.2-.1-.2-.2c-.6.2-1.3.5-2 .9h.2c.1 0 .2-.1.3-.1.1-.2.2-.2.2-.2.5-.2.8-.2.9-.1l.1-.1c.2.2.3.4.4.5-.1-.1-.3-.1-.6 0s-.4.2-.5.2c.1.2.1.3.1.4-.1 0-.1-.1-.2-.2s-.2-.2-.3-.2c-.1-.1-.2-.1-.3-.1h-.5c-2 1-3.7 2.6-4.9 4.5.1.1.2.2.3.2 0 0 0 .1.1.2 0 .1 0 .2.1.2 0 0 .1 0 .2-.1.1.1.1.2.1.4l.9.6c.3.2.4.4.4.4 0 .2 0 .3-.2.4l-.2-.2c-.1-.1-.2-.1-.2-.1v.4c0 .2.1.3.2.3-.1 0-.2.1-.2.3s-.1.5-.1.7v.5c0 .2 0 .4.1.7s.3.4.4.4c-.2 0 0 .3.4.9.1.1.1.2.2.2l.2.2c.1.1.2.1.3.2.3.1.3.2.4.3s.1.2.2.5.2.4.3.5c0 .1 0 .2.2.4.2.1.2.3.2.4h-.1-.1c0 .1.1.2.3.3s.3.2.3.3v.2c0 .1 0 .2.1.2 0 .1.1.1.2 0 0-.3-.1-.7-.5-1.3-.1-.2-.2-.4-.2-.5s-.1-.2-.1-.3-.1-.2-.1-.3h.1c.1 0 .1 0 .2.1.1 0 .1.1.2.1 0 0 .1 0 0 .1v.4s.2.3.2.4l.4.4s.2.2.2.3c.1.1.2.2.3.4s.1.3 0 .3c.1 0 .3.1.4.2.2.1.3.3.4.4s.1.3.2.5c0 .3.1.4.1.5s.1.2.2.3.2.2.3.2l.3.2c.1.1.2.1.3.1s.2.1.4.2.3.2.4.2c.1.1.2.1.3.1s.2 0 .3-.1c.1 0 .2-.1.3-.1.2 0 .4.1.6.3s.3.4.4.4c.5.3.9.3 1.1.2v.2c0 .1.1.2.2.3s.1.2.2.3c0 .1.1.1.1.2.1.1.2.2.4.3s.3.2.4.3c.1-.1.1-.1.1-.2 0 .1 0 .2.1.4s.3.2.4.2c.2 0 .3-.3.3-.7-.4.2-.8.1-1-.4 0 0 0-.1-.1-.1 0-.1-.1-.1-.1-.2s0-.1-.1-.2v-.2s0-.1.1-.1.2 0 .2-.1v-.3c0-.1-.1-.2-.1-.3s-.1-.2-.2-.4-.2-.3-.2-.3c-.1.1-.2.2-.3.2-.2 0-.3-.1-.3-.2v.2h-.3s0-.2.1-.4c0-.2 0-.4.1-.5 0-.1.1-.1.1-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3s0-.1-.1-.2c-.1 0-.2-.1-.4-.1-.3 0-.4.2-.5.4 0 0 0 .1-.1.2s-.1.2-.1.2c0 .1-.1.1-.2.1s-.3.1-.5 0-.4 0-.5-.1c-.2-.1-.3-.3-.5-.6-.1-.3-.2-.5-.2-.8 0-.1 0-.3.1-.6 0-.2.1-.4.1-.5s0-.3-.1-.5l.2-.2.2-.2H14.5s0-.1.1-.1l-.1-.1-.1-.1h.6c.3-.1.5-.1.6 0 .2.2.4.1.5 0 0 0 0-.1-.1-.2V16c.1.4.3.4.6.2 0 0 .1.1.3.1s.3.1.4.1l.1.1c.1 0 .1.1.1.1h.1s.1-.1.2-.1c.1.2.2.4.2.5.2.6.3.9.4.9s.2.1.2 0 .1-.1.1-.2v-.3-1.1c-.2 0-.3-.1-.4-.2v-.4c.1-.1.2-.3.3-.4 0 0 .1 0 .2-.1.1 0 .2-.1.3-.1.1-.1.2-.1.3-.2.3-.3.4-.5.3-.7.1 0 .2-.1.2-.2l-.1-.1c-.1 0-.1-.1-.2-.1h-.1c.1-.1.1-.2 0-.3.1 0 .1-.1.2-.2 0-.1.1-.2.2-.2.1.2.3.2.4 0 .1-.1.1-.2 0-.3.1-.1.2-.2.4-.2s.3-.1.4-.2h.2v-.2c0-.1 0-.2.1-.2.1-.1.2-.1.3-.2.2-.1.2-.1.3-.1l.4-.2v-.1c.2 0 .5 0 .6-.2s.1-.3-.1-.4c0-.1 0-.1-.1-.2-.1 0-.2-.1-.3-.1h.4c.2-.1.2-.2-.1-.3-.4.3-.7.4-1.1.7zm-3.4 18.2c2.9-.5 5.3-1.8 7.3-3.9 0 0-.1-.1-.3-.1-.1 0-.2 0-.3-.1-.2-.1-.4-.2-.5-.2 0-.1 0-.2-.1-.3 0-.1-.1-.1-.2-.2s-.1-.1-.3-.2c-.1-.1-.2-.1-.2-.1l-.1-.1-.1-.1s-.1-.1-.2-.1-.1-.1-.2 0H22.8s-.1 0-.1.1c0 0-.1 0-.1.1 0 0-.1 0-.1.1v.1c-.3-.2-.5-.4-.8-.5-.1 0-.1-.1-.2-.1s-.2-.1-.2-.1h-.2c-.1 0-.2.1-.2.1-.1.1-.1.2-.1.3v.3c-.1-.1-.1-.2 0-.4s.1-.3 0-.4c0-.1-.1-.1-.2-.1s-.2.1-.2.1l-.2.2c-.1.1-.2.1-.2.1s-.1.1-.2.1-.1.1-.2.2c0 .1-.1.1-.1.2s-.1.2-.1.2c0-.1-.1-.1-.2-.1s-.2-.1-.2-.1c0 .1.1.4.1.7s.1.6.1.8c.1.4 0 .8-.2 1-.4.3-.6.6-.6.8-.1.3 0 .5.2.5 0 .1-.1.2-.2.4s-.2.3-.1.4z"
        fill="#151619"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgGlobe;
