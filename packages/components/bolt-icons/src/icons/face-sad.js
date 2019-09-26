import { h } from '@bolt/core/renderers';

export const FaceSad = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill={bgColor}>
        <path d="M11.9 14.3c-1.7 0-3.3.8-4.3 2.2l1.1.8c.8-1 1.9-1.6 3.2-1.6s2.5.6 3.2 1.6l1.1-.8c-1-1.4-2.6-2.2-4.3-2.2z" />
        <path
          d="M9 9.6c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4c0 .8.6 1.4 1.4 1.4S9 10.3 9 9.6z"
          class="st0"
        />
        <path
          d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.6C6.2 22.6 1.4 17.8 1.4 12S6.2 1.4 12 1.4 22.6 6.1 22.6 12 17.8 22.6 12 22.6z"
          class="st0"
        />
        <path
          d="M16 8.2c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4s1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"
          class="st0"
        />
      </g>
    </svg>
  );
};
