// import { Preact, h } from 'preact';
const ChevronRight = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/chevron-right</title>
      <g fill="currentColor" fill-rule="evenodd">
        <circle
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
          cx="50%"
          cy="50%"
          r="50%"
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
