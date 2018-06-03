// import { Preact, h } from '@bolt/core';
const InfoSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Untitled 9</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm.706-14.294C12.893 8.518 13 8.262 13 8a1.005 1.005 0 0 0-1-1 1.001 1.001 0 0 0 0 2c.262 0 .52-.106.706-.294zM13 16v-4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
};
export default InfoSolid;
