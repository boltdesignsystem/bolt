import { h } from '@bolt/core';

export const Integration = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg
      width={size}
      height={size}
      {...otherProps}
      viewBox="0 0 32 32"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          d="M30 12H8v-2a2 2 0 0 1 2-1.999h18A2 2 0 0 1 30 10v2zm0 16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V14h22v14zM28 6H10a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4zM4 2.001A2 2 0 0 0 2 4v2h2v2H2v14a2 2 0 0 0 2 2v2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4h-2a2 2 0 0 0-2-1.999H4zm20.5 18.983v2h-4v4h-2v-4h-4v-2h4v-4h2v4h4z"
          id="a"
        />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <mask id="b" fill="#fff">
          <use xlink:href="#a" />
        </mask>
        <g mask="url(#b)" fill={bgColor}>
          <path d="M0 0h32v32H0z" />
        </g>
      </g>
    </svg>
  );
};
