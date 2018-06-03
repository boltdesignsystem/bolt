// import { Preact, h } from '@bolt/core';
const AddSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Untitled 2</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm1-12V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
};
export default AddSolid;
