// import { Preact, h } from '@bolt/core';
const CloseSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" {...otherProps}>
      <title>close-solid</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M11 22C4.925 22 0 17.075 0 11S4.925 0 11 0s11 4.925 11 11-4.925 11-11 11zm3.536-8.879l-2.122-2.12 2.122-2.122a1.003 1.003 0 0 0 0-1.414 1.002 1.002 0 0 0-1.415 0L11 9.586l-2.121-2.12a1 1 0 0 0-1.414 1.413L9.585 11l-2.12 2.121a1 1 0 0 0 1.414 1.414l2.12-2.12 2.122 2.12c.39.39 1.026.39 1.415 0a1.003 1.003 0 0 0 0-1.414z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
};
export default CloseSolid;
