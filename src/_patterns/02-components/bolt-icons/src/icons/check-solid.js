// import { Preact, h } from '@bolt/core';
const CheckSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" {...otherProps}>
      <title>check-solid</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M11 22C4.925 22 0 17.075 0 11S4.925 0 11 0s11 4.925 11 11-4.925 11-11 11zm4.05-14.839L9.332 12.77l-2.386-2.275a.558.558 0 0 0-.784 0 .557.557 0 0 0 0 .785l2.777 2.778a.553.553 0 0 0 .784 0l6.11-6.11a.55.55 0 0 0 0-.786.556.556 0 0 0-.783 0z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
};
export default CheckSolid;
