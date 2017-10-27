// import { Preact, h } from 'preact';
const Partners = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/How/Partners</title>
      <g fill="currentColor" fill-rule="evenodd">
        <circle
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          cx="50%"
          cy="50%"
          r="50%"
        />
        <path
          d="M8.333 9.6a7.468 7.468 0 1 1 14.936.002A7.468 7.468 0 0 1 8.333 9.6m12.164 8.369A9.594 9.594 0 0 0 25.4 9.6a9.6 9.6 0 0 0-19.2 0 9.594 9.594 0 0 0 4.903 8.369C6.361 19.842 3 24.459 3 29.867V32h2.133v-2.133C5.133 23.975 9.91 19.2 15.8 19.2s10.667 4.775 10.667 10.667V32H28.6v-2.133c0-5.409-3.36-10.025-8.103-11.898"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Partners;
