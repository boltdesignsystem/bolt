import { h } from '@bolt/core/renderers';

export const Search = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <title>{title}</title>
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          fill={bgColor}
          d="M9.518 15.035A5.524 5.524 0 014 9.517 5.524 5.524 0 019.518 4a5.524 5.524 0 015.518 5.517 5.524 5.524 0 01-5.518 5.518m12.189 5.258l-6.221-6.222a7.469 7.469 0 001.55-4.554C17.036 5.372 13.664 2 9.518 2S2 5.372 2 9.517c0 4.145 3.372 7.518 7.518 7.518a7.471 7.471 0 004.554-1.55l6.22 6.222a1 1 0 001.415-1.414"
        />
      </g>
    </svg>
  );
};
