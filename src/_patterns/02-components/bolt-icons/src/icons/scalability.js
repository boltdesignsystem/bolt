// import { Preact, h } from '@bolt/core';
const Scalability = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>brand icons/community/brand-scalability</title>
      <defs>
        <path
          d="M16 27v-1h2v1h6v-3h3V8.001h-3V5H8v3.001H5V14h1v2H5v8h3v3h8zm8-27h8v8.001h-3.001V24H32v8h-8v-2.999H8V32H0v-8h2.999V8.001H0V0h8v3.001h16V0zm2 5v1h3.999V2.001H26V5zM1.999 2.001V6H6V2.001H1.999zm24.001 27v1h3.999V26H26v3.001zM1.999 26v4.001H6V26H1.999zM8 14h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"
          id="a"
        />
      </defs>
      <g fill="currentColor" fill-rule="evenodd">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <g mask="url(#b)" fill="currentColor">
          <path d="M0 0h32v32H0z" />
        </g>
      </g>
    </svg>
  );
};
export default Scalability;
