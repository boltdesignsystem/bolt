// import { Preact, h } from '@bolt/core';
const CloseOpen = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Close-open</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <g fill="currentColor">
          <path d="M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1" />
          <path d="M15.536 14.121l-2.122-2.12 2.122-2.122a1.003 1.003 0 0 0 0-1.414 1.002 1.002 0 0 0-1.415 0L12 10.586l-2.121-2.12a1 1 0 0 0-1.414 1.413L10.585 12l-2.12 2.121a1 1 0 0 0 1.414 1.414l2.12-2.12 2.122 2.12c.39.39 1.026.39 1.415 0a1.003 1.003 0 0 0 0-1.414" />
        </g>
      </g>
    </svg>
  );
};
export default CloseOpen;
