// import { Preact, h } from '@bolt/core';
const Search = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/search</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M9.518 15.035A5.524 5.524 0 0 1 4 9.517 5.524 5.524 0 0 1 9.518 4a5.524 5.524 0 0 1 5.518 5.517 5.524 5.524 0 0 1-5.518 5.518m12.189 5.258l-6.221-6.222a7.469 7.469 0 0 0 1.55-4.554C17.036 5.372 13.664 2 9.518 2S2 5.372 2 9.517c0 4.145 3.372 7.518 7.518 7.518a7.471 7.471 0 0 0 4.554-1.55l6.22 6.222a1 1 0 0 0 1.415-1.414"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Search;
