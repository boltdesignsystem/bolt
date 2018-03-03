const ChevronRight = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <path
          d="M9.704 5.29a1.005 1.005 0 0 0-1.413 0 1.004 1.004 0 0 0 0 1.413l5.294 5.295-5.294 5.295a1.005 1.005 0 0 0 0 1.413.998.998 0 0 0 1.412 0l6-6a.993.993 0 0 0 0-1.414l-6-6.002z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default ChevronRight;
