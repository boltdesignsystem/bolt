// import { Preact, h } from '@bolt/core';
const Documentation = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>brand icons/community/brand-documentation</title>
      <path
        d="M25 19H11a1 1 0 0 0 0 2.001h14A1 1 0 1 0 25 19zm3 5.001a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-.999h18c.553 0 1 .447 1 .999v20.001zM28 1H8a2 2 0 0 0-2 2.001v22A2 2 0 0 0 8 27h20a2 2 0 0 0 2-1.999v-22A2 2 0 0 0 28 1zm-3 12.001H11a1 1 0 1 0 0 2h14a1 1 0 0 0 0-2zm-14-4h8A1 1 0 1 0 19 7h-8a1 1 0 0 0 0 2.001zm-7-4A2 2 0 0 0 2 7v22a2 2 0 0 0 2 2.001h22A2 2 0 0 0 28 29H4V5.001z"
        id="id-6a"
      />
      <g fill="currentColor" fill-rule="evenodd">
        <mask id="id-7b" fill="#fff">
          <use xlinkHref="#id-6a" />
        </mask>
        <g mask="url(#id-7b)" fill="currentColor">
          <path d="M0 0h32v32H0z" />
        </g>
      </g>
    </svg>
  );
};
export default Documentation;
