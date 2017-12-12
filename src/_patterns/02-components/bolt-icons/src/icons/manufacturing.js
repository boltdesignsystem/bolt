// import { Preact, h } from '@bolt/core';
const Manufacturing = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/Industry/Manufacturing</title>
      <path
        d="M24 0v4h-4V0h-2v4h-4V0h-2v4H8V0H6v4H4v1.999H0V8h4v4H0v2h4v4H0v2h4v4H0v2h4v2h2v4h2v-4h4v4h2v-4h4v4h2v-4h4v4h2v-4h2v-2h4v-2h-4v-4h4v-2h-4v-4h4v-2h-4V8h4V5.999h-4V4h-2V0h-2zM6 24V5.999h20V26H6v-2z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Manufacturing;
