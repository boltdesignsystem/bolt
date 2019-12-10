import { h } from '@bolt/core/renderers';

export const Exclamation = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 3 15">
      <path
        fill={bgColor}
        fill-rule="nonzero"
        d="M.72 11L0 3.478V0h3v3.478L2.29 11H.72zm.78 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
      />
    </svg>
  );
};
