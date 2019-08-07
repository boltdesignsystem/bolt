import { h } from '@bolt/core/renderers';

export const CircleDashed = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 402 402">
      <path
        d="M201 401c110.5 0 200-89.5 200-200S311.5 1 201 1 1 90.5 1 201s89.5 200 200 200z"
        style="height:100%;width:100%"
        fill="none"
        stroke={bgColor}
        stroke-dasharray="5.4545,5.4545"
      />
    </svg>
  );
};
