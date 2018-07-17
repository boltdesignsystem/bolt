import { h } from '@bolt/core';

export const Academy = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg
      width={size}
      height={size}
      {...otherProps}
      viewBox="0 0 32 32"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          d="M16 32a.97.97 0 0 1-.338-.06C15.525 31.89 2 26.783 2 11.717V.942C2 .422 2.432 0 2.966 0h26.068c.533 0 .965.422.965.942v10.774C30 26.782 16.475 31.89 16.337 31.94A.979.979 0 0 1 16 32zM3.93 1.883v9.833c0 12.488 10.093 17.469 12.074 18.324 2.042-.86 12.063-5.72 12.063-18.324V1.883H3.93zm10.444 16.58a.986.986 0 0 1-.684-.275L9.96 14.55a.925.925 0 0 1 0-1.331.986.986 0 0 1 1.366 0l3.049 2.972 6.298-6.144a.987.987 0 0 1 1.367 0 .927.927 0 0 1 0 1.332l-6.983 6.809a.981.981 0 0 1-.682.275z"
          id="a"
        />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <mask id="b" fill="#fff">
          <use xlink:href="#a" />
        </mask>
        <g fill={bgColor} mask="url(#b)">
          <path fill={bgColor} d="M0 0h32v32H0z" />
        </g>
      </g>
    </svg>
  );
};
