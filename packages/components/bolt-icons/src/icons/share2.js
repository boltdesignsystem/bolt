import { h } from '@bolt/core';

export const Share2 = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor} fill-rule="evenodd">
        <path />
        <path
          d="M21.746 7.105L12.614.144A.77.77 0 0 0 12.16 0a.81.81 0 0 0-.31.062c-.254.107-.415.335-.415.583l.005 3.748c-3.995.12-6.839 1.273-8.844 3.506C-.67 11.53.06 16.81.093 17.029c.05.32.297.557.636.557h.024c.347-.012.567-.268.597-.597.023-.243.476-6.436 10.09-6.436l-.006 3.766c0 .247.161.474.415.579a.76.76 0 0 0 .308.062.773.773 0 0 0 .46-.147l9.131-6.695A.646.646 0 0 0 22 7.61a.645.645 0 0 0-.254-.505"
          fill={bgColor}
          mask="url(#mask-2)"
          transform="translate(1 3)"
        />
      </g>
    </svg>
  );
};
