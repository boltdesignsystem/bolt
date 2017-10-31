// import { Preact, h } from 'preact';
const Product = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/How/Product</title>
      <g fill="currentColor" fill-rule="evenodd">
        <circle
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
          cx="50%"
          cy="50%"
          r="50%"
        />
        <path
          d="M9 6.998c-.552 0-1 .449-1 1.002v13c0 .55.448 1 1 1s1-.45 1-1V8c0-.553-.448-1.002-1-1.002zm21 18L24 22l-7 4-9-2-6 3V6.998l6-2.999L17 8l7-6 6 4v18.998zM24 0l-7 6-9-4-8 3.978V30l8-4 9 2 7-4 8 4V5l-8-5zm0 19a1 1 0 0 0 2 0V6a1 1 0 1 0-2 0v13zm-7-9.002c-.552 0-1 .45-1 1.002v11a1 1 0 0 0 2 0V11c0-.553-.448-1.002-1-1.002z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Product;
