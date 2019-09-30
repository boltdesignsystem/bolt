import { h } from '@bolt/core/renderers';

export const Print = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          fill={bgColor}
          d="M21 16c0 .55-.45 1-1 1h-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v3H4c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5zM7 21h10v-6H7v6zM7 8h10V3H7v5zm13 0h-1V2c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v6H4c-1.656 0-3 1.344-3 3v5c0 1.656 1.344 3 3 3h1v3c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3h1c1.656 0 3-1.344 3-3v-5c0-1.656-1.344-3-3-3z"
        />
      </g>
    </svg>
  );
};
