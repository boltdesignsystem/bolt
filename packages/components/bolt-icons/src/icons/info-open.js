import { h } from '@bolt/core/renderers';

export const InfoOpen = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <title>{title}</title>
      <g fill="none" fill-rule="evenodd">
        <path />
        <g fill={bgColor}>
          <path d="M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1" />
          <path d="M12 11c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1M12 7a1.001 1.001 0 000 2 1.001 1.001 0 000-2" />
        </g>
      </g>
    </svg>
  );
};
