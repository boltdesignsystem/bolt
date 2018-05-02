import { h } from '@bolt/core';

export const Calendar = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <g fill={bgColor}>
          <path d="M4 20.125h16v-11H4v11zm16-17.5h-.938V1h-2v1.625H6.937V1h-2v1.625H4a2 2 0 0 0-2 2v15.5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-15.5a2 2 0 0 0-2-2z" />
          <path d="M6.292 13.125h11.416v-2H6.292zM6.292 17.458h9v-2h-9z" />
        </g>
      </g>
    </svg>
  );
};
