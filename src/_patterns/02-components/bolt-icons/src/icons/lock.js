// import { Preact, h } from '@bolt/core';
const Lock = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Lock</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M20 20c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v7zM8 7c0-2.206 1.794-4 4-4s4 1.794 4 4v3H8V7zm11 3h-1V7c0-3.306-2.694-6-6-6a6.01 6.01 0 0 0-6 6v3H5c-1.656 0-3 1.344-3 3v7c0 1.656 1.344 3 3 3h14c1.656 0 3-1.344 3-3v-7c0-1.656-1.344-3-3-3z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Lock;
